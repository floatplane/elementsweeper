const React = require('react');

/* Import Components */
const Board = require('./Board');
const Alert = require('./Alert');
const Animations = require('./Animations');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clickMine = this.clickMine.bind(this);
    this.state = {
      alertMessage: "",
      win: false,
      lose: false,
      animations: ["🦁","🎄","🌞","🍘"],
      height: props.height,
      width: props.width,
      mines: props.mines,
      board: this.buildBoard(props.height,props.width,props.mines)
    };
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.win) {
      var win = this.checkWin();
      if (win) {
        this.setState({
          alertMessage: "You Win!",
          win: true
        });
      }
    }
  }
  
  buildBoard(height, width, mines) {
    var totalSquares = height * width;
    
    // Make sure there aren't more mines than squares
    if (mines > totalSquares) {
      mines = totalSquares;
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
      var mineStatus = false;
      if (mineArray.indexOf(i) >= 0) {
        mineStatus = true;
      }
      // Create square object
      var square = {
        position: i,
        mineStatus: mineStatus
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
        row[j].clickStatus = false;
        row[j].flagStatus = false;
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
      if (nSq.mineStatus) {
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
      this.handleClick(board[r][c]);
    } 
  }
  
  handleClick(e, square, type) {
    e.preventDefault();
    if (type === "reveal") {
      if (!square.clickStatus) {
        // If square clicked is a mine neighbor do nothing except reveal
        var callback = () => {};
        if (square.mineStatus) {
          // If square clicked is a mine trigger lose game
          callback = this.clickMine;
        } else if (!square.neighboringMines) {
          // If square clicked is not a mine neighbor start recursive reveal
          callback = (board) => this.revealNeighbors(square, board);
        }    
        var updatedBoard;
        this.setState((prevState, props) => {
          updatedBoard = prevState.board;
          updatedBoard[square.rowIndex][square.colIndex].clickStatus = true;
          return {
            board: updatedBoard
          };
        },() => callback(updatedBoard));
      }
    } else {
      
      
      
    }
  }
    
  
  clickMine() {
    //alert("You Lose");
    this.setState({
      alertMessage: "You Lose",
      lose: true
    });
  }
  
  checkWin() {
    var win = true;
    for (var i in this.state.board) {
      for (var j in this.state.board[i]) {
        var square = this.state.board[i][j];
        if (!square.clickStatus && !square.mineStatus) {
          win = false;
          break;
        }
      }
      if (!win) {
        break;
      }
    }
    return win;
  }
  
  
  render() {
    return (
      <div>
        <Animations items={this.state.animationItems} />
        <h1>Minesweeper</h1>
        <Alert
          message={this.state.alertMessage}
        />
        <Board
          board={this.state.board}
          clickSquare={this.handleClick}
          //flagSquare={this.handleFlag}
        />
      </div>
    );
  }
}

module.exports = Game;