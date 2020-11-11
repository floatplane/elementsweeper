const React = require("react");
const { Button } = require("@material-ui/core");
const { bindAll, cloneDeep, merge } = require("lodash");

/* Import Components */
const Board = require("./Board");
const WinDialog = require("./dialogs/Win");
const LoseDialog = require("./dialogs/Lose");

class Game extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      "resize",
      "updateSquare",
      "handleCloseAlert",
      "undo",
      "reset"
    ]);

    this.boardStack = [this.buildBoard(props.height, props.width, props.mines)];
    this.state = {
      alertMessage: "",
      win: false,
      lose: false,
      height: props.height,
      width: props.width,
      mines: props.mines,
      board: this.boardStack[0]
    };

    fetch("/undoAttempts")
      .then(response => response.json())
      .then(data => this.setState({ undoAttempts: data.undoAttempts }));
  }

  reset() {
    const { height, width, mines } = this.props;
    this.boardStack = [this.buildBoard(height, width, mines)];
    this.setState({
      alertMessage: "",
      win: false,
      lose: false,
      board: this.boardStack[0]
    });
  }

  resize() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  buildBoard(height, width, mines) {
    var totalSquares = height * width;

    // Make sure there aren't more mines than squares
    if (mines >= totalSquares) {
      mines = totalSquares - 1;
    }

    // Generate random mine positions:
    var mineArray = [];
    for (var i = 0; i < mines; i++) {
      var position = Math.floor(Math.random() * totalSquares);
      if (mineArray.indexOf(position) === -1) {
        mineArray.push(position);
      } else {
        i--;
      }
    }

    // Create one dimensional array
    var oneDimBoard = [];

    for (var i = 0; i < totalSquares; i++) {
      // Check if square is a mine
      var hasMine = false;
      if (mineArray.indexOf(i) >= 0) {
        hasMine = true;
      }
      // Create square object
      var square = {
        hasMine: hasMine
      };
      // Add square to one dimensional array
      oneDimBoard.push(square);
    }
    // Split one dimensional array into two dimensional array
    var board = [];
    for (var i = 0; i < height; i++) {
      var startSlice = width * i;
      var endSlice = width * (i + 1);
      var row = oneDimBoard.slice(startSlice, endSlice);
      // console.log("row", i, row);
      for (var j = 0; j < row.length; j++) {
        row[j].row = i;
        row[j].col = j;
        row[j].clicked = false;
        row[j].flagged = false;
        row[j].mineTriggered = false;
      }
      board.push(row);
    }

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        board[i][j].neighboringMines = this.countNeighboringMines(
          board[i][j],
          board,
          width,
          height
        );
      }
    }

    return board;
  }

  getNeighbors(square, width, height) {
    var boardIndexNeighbors = [];
    var relNeighbors = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      //not [ 0, 0]
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
    ];
    var absNeighbors = relNeighbors.map(s =>
      s.map((c, i) => (i === 0 ? c + square.col : c + square.row))
    );
    //return absNeighbors;
    for (var i in absNeighbors) {
      var n = absNeighbors[i];
      if (n[0] >= 0 && n[1] >= 0 && n[0] < width && n[1] < height) {
        // row, column are reversed order as array indexes
        boardIndexNeighbors.push({ col: n[0], row: n[1] });
      }
    }
    return boardIndexNeighbors;
  }

  countNeighboringMines(square, board, width, height) {
    var neighboringMines = 0;
    var boardIndexNeighbors = this.getNeighbors(square, width, height);
    for (var i in boardIndexNeighbors) {
      var r = boardIndexNeighbors[i].row;
      var c = boardIndexNeighbors[i].col;
      var nSq = board[r][c];
      if (nSq.hasMine) {
        neighboringMines++;
      }
    }
    return neighboringMines;
  }

  revealNeighbors(square, board) {
    /*
    for neighbors of non mine-neighbor square:
      reveal (as if you clicked on it)
      (if it's also empty click functionality should start recursion)
    */
    var boardIndexNeighbors = this.getNeighbors(
      square,
      this.state.width,
      this.state.height
    );
    for (var i in boardIndexNeighbors) {
      var r = boardIndexNeighbors[i].row;
      var c = boardIndexNeighbors[i].col;
      if (!board[r][c].clicked) {
        this.updateSquareInternal(board, board[r][c], "autoReveal");
      }
    }
  }

  updateSquareInternal(board, square, type) {
    if (type === "reveal" || type === "autoReveal") {
      if (!square.clicked && !square.flagged) {
        square.clicked = true;
        if (square.hasMine) {
          // If square clicked is a mine trigger lose game
          square.mineTriggered = true;
          return { mineTriggered: true };
        } else if (!square.neighboringMines) {
          // If square clicked is not a mine neighbor start recursive reveal
          // No need to worry about triggering a mine in this branch
          this.revealNeighbors(square, board);
        }
      }
    } else {
      if (!square.clicked) {
        board[square.row][square.col].flagged = !board[square.row][square.col]
          .flagged;
      }
    }
    return { mineTriggered: false };
  }

  updateSquare(square, type) {
    if (type !== "reveal" && type !== "flag") {
      throw new Error(`unknown update type ${type}`);
    }

    if (this.state.win || this.state.lose) {
      console.log("game is over, ignoring");
      return;
    }

    const nextBoard = cloneDeep(this.boardStack[this.boardStack.length - 1]);
    this.boardStack.push(nextBoard);
    const nextSquare = nextBoard[square.row][square.col];
    const { mineTriggered } = this.updateSquareInternal(
      nextBoard,
      nextSquare,
      type
    );
    var nextState = { board: nextBoard };
    if (mineTriggered) {
      merge(nextState, {
        lose: true
      });
      this.showAllMines(nextBoard, false);
    } else if (this.checkWin(nextBoard)) {
      merge(nextState, {
        win: true
      });
      this.showAllMines(nextBoard, true);
    }
    this.setState(nextState);
  }

  checkWin(board) {
    for (var row in board) {
      for (var col in board[row]) {
        var square = board[row][col];
        if (!square.clicked && !square.hasMine) {
          return false;
        }
      }
    }
    return true;
  }

  showAllMines(board, win) {
    board.forEach(row => {
      row.forEach(square => {
        if (square.hasMine) {
          square.clicked = true;
          square.flagged = win;
        }
      });
    });
  }

  handleCloseAlert() {
    this.setState({
      alertMessage: ""
    });
  }

  canUndo() {
    return this.state.undoAttempts >= 1 && this.boardStack.length > 1;
  }

  undo() {
    if (this.canUndo()) {
      this.boardStack.pop();
      this.setState({
        undoAttempts: this.state.undoAttempts - 1,
        board: this.boardStack[this.boardStack.length - 1],
        win: false,
        lose: false,
        alertMessage: ""
      });
      fetch("/undo", { method: "POST" })
        .then(response => response.json())
        .then(data => this.setState({ undoAttempts: data.undoAttempts }));
    }
  }

  render() {
    return (
      <div>
        <div id="game-container">
          <LoseDialog
            open={this.state.lose}
            canUndo={this.canUndo()}
            onClose={this.reset}
            onUndo={this.undo}
          />
          <WinDialog open={this.state.win} onClose={this.reset} />
          <div id="undo-section">
            Lives remaining: <span>{this.state.undoAttempts}</span>
          </div>
          <Board
            board={this.state.board}
            updateSquare={this.updateSquare}
            height={this.state.height}
            width={this.state.width}
          />
        </div>
      </div>
    );
  }
}

module.exports = Game;
