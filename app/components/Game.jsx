const React = require('react');

/* Import Components */
const Board = require('./Board');
const Alert = require('./Alert');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickMine = this.clickMine.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.state = {
      alertMessage: "",
      win: false,
      lose: false,
      revealed: false,
      flagClick: false,
      flagCount: props.mines,
      height: props.height,
      width: props.width,
      mines: props.mines,
      board: this.buildBoard(props.height,props.width,props.mines),
      boardSize: 0
    };
  }

  resize() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidUpdate(prevProps, prevState) {
    var updatedBoard = prevState.board;
    var newWinState = false;
    var newBoardState = false;

    if (!this.state.win) {
      var win = this.checkWin();
      if (win) {
        console.log("You Win!!");
        newWinState = {
          alertMessage: "Good Job! You flagged all of the treasure! You win the game!",
          win: true
        };
      }
    }

    if ((this.state.win || this.state.lose) && !this.state.revealed) {
      updatedBoard.forEach(row => {
        row.forEach(square => {
          if (square.hasMine) {
            square.clicked = true;
          }
        });
      });

      newBoardState = {
        board: updatedBoard,
        revealed: true
      };
    }

    if (newWinState || newBoardState) {
      this.setState(Object.assign({}, newWinState, newBoardState));
    }
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
        i--
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
        position: i,
        hasMine: hasMine
      };
      // Add square to one dimensional array
      oneDimBoard.push(square);
    }
    // Split one dimensional array into two dimensional array
    var board = [];
    for (var i = 0; i < height; i++) {
      var startSlice = width * i;
      var endSlice = (width * (i + 1));
      var row = oneDimBoard.slice(startSlice, endSlice);
      for (var j in row) {
        row[j].rowIndex = i;
        row[j].colIndex = j;
        row[j].clicked = false;
        row[j].flagged = false;
        row[j].mineTriggered = false;
      }
      board.push(row);
    }

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        board[i][j].neighboringMines = this.countNeighboringMines(board[i][j], board, width, height);
      }
    }


    return board;
  }

  getNeighbors(square, width, height) {
    var boardIndexNeighbors = [];
    var relNeighbors = [
      [-1,-1],
      [ 0,-1],
      [ 1,-1],
      [-1, 0],
//not [ 0, 0]
      [ 1, 0],
      [-1, 1],
      [ 0, 1],
      [ 1, 1]
    ]
    var absNeighbors = relNeighbors.map(
      s => s.map(
        (c, i) => i === 0 ? c + parseInt(square.colIndex) : c + parseInt(square.rowIndex)
    ));
    //return absNeighbors;
    for (var i in absNeighbors) {
      var n = absNeighbors[i];
      if (n[0] >= 0 && n[1] >= 0 && n[0] < width && n[1] < height) {
        // row, column are reversed order as array indexes
        boardIndexNeighbors.push({colIndex: n[0], rowIndex: n[1]});
      }
    }
    return boardIndexNeighbors;
  }

  countNeighboringMines(square, board, width, height) {

    var neighboringMines = 0;
    var boardIndexNeighbors = this.getNeighbors(square, width, height);
    for (var i in boardIndexNeighbors) {
      var r = boardIndexNeighbors[i].rowIndex;
      var c = boardIndexNeighbors[i].colIndex;
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
    var boardIndexNeighbors = this.getNeighbors(square, this.state.width, this.state.height);
    for (var i in boardIndexNeighbors) {
      var r = boardIndexNeighbors[i].rowIndex;
      var c = boardIndexNeighbors[i].colIndex;
      if (!board[r][c].clicked) {
        this.handleClick(false, board[r][c], "autoReveal");
      }
    }
  }

  handleClick(e, square, type) {
    if (e) {
      e.preventDefault();
    }
    if ((type === "reveal"  && !this.state.flagClick) || type === "autoReveal") {
      if (!square.clicked && !square.flagged) {
        // If square clicked is a mine neighbor do nothing except reveal
        var callback = () => {};
        if (square.hasMine) {
          // If square clicked is a mine trigger lose game
          square.mineTriggered = true;
          callback = this.clickMine;
        } else if (!square.neighboringMines) {
          // If square clicked is not a mine neighbor start recursive reveal
          callback = (board) => this.revealNeighbors(square, board);
        }
        var updatedBoard;
        this.setState((prevState, props) => {
          updatedBoard = prevState.board;
          updatedBoard[square.rowIndex][square.colIndex].clicked = true;
          return {
            board: updatedBoard
          };
        },() => callback(updatedBoard));
      }
    } else {
      if (!square.clicked) {
        var flagged = true;
        var flagChange = -1;
        if (square.flagged) {
          flagged = false;
          flagChange = 1;
        }
        this.setState((prevState, props) => {
          updatedBoard = prevState.board;
          updatedBoard[square.rowIndex][square.colIndex].flagged = flagged;
          return {
            board: updatedBoard,
            flagCount: prevState.flagCount + flagChange
          };
        });
      }
    }
  }


  clickMine() {
    //alert("You Lose");
    setTimeout(function() {
      this.setState({
        alertMessage: "You revealed the treasure too soon! The police confiscates it. Better luck next time.",
        lose: true
      });
    }.bind(this), 300);
  }

  checkWin() {
    if (!this.state.lose) {
      var win = true;
      for (var i in this.state.board) {
        for (var j in this.state.board[i]) {
          var square = this.state.board[i][j];
          if (!square.clicked && !square.hasMine) {
            win = false;
            break;
          }
        }
        if (!win) {
          break;
        }
      }
      return win;
    } else {
      return false;
    }
  }

  handleToggle() {
    this.setState((prevState, props) => {
      return {
        flagClick: !prevState.flagClick
      };
    });
  }

  handleCloseAlert() {
    this.setState({
      alertMessage: ""
    });
  }

  render() {
    return (
      <div>
        <div
          id="game-container"
        >

          <Alert
            message={this.state.alertMessage}
            close={this.handleCloseAlert}
          />
          <Board
            board={this.state.board}
            clickSquare={this.handleClick}
            height={this.state.height}
            width={this.state.width}
          />

        </div>
      </div>
    );
  }
}

module.exports = Game;
