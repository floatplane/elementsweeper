const React = require('react');

/* Import Components */
const Board = require('./Board');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      height: props.height,
      width: props.width,
      mines: props.mines,
      board: this.buildBoard(props.height,props.width,props.mines)
    };
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
  
  countNeighboringMines(square, board, width, height) {
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
    var neighboringMines = 0;
    var absNeighbors = relNeighbors.map(
      s => s.map(
        (c, i) => i === 0 ? c + parseInt(square.colIndex) : c + parseInt(square.rowIndex)   
    ));
    
    for (var i in absNeighbors) {
      var n = absNeighbors[i];
      if (n[0] >= 0 && n[1] >= 0 && n[0] < width && n[1] < height) {
        // row, column are reversed order as array indexes
        if (board[n[1]][n[0]].mineStatus) {
          neighboringMines++
        }
      }
    }
    return neighboringMines;
  }
  
  revealEmptyNeighbors(square) {
    /*
    for neighbors of non mine-neighbor square:
      reveal (as if you clicked on it)
      (if it's also empty click functionality should start recursion)
    */
    
  }
  
  handleClick(square) {
    console.log(square.neighboringMines);
    // If square clicked is a mine neighbor do nothing
    var callback = () => {};
    if (square.mineStatus) {
      // If square clicked is a mine trigger lose game
      callback = this.clickMine;
    } else if (!square.neighboringMines) {
      // If square clicked is not a mine neighbor start recursive reveal
      callback = () => this.recursiveReveal(square);
    }    
    
    this.setState((prevState, props) => {
      var updatedBoard = prevState.board;
      updatedBoard[square.rowIndex][square.colIndex].clickStatus = true;
      return {
        board: updatedBoard
      };
    }, callback);
  }
  
  recursiveReveal(square) {
    alert("Reveal! " + square.position);
  }
  
  clickMine() {
    alert("You Lose");
  }
  
  
  render() {
    return (
      <div>
        <h1>Minesweeper</h1>
        <Board
          board={this.state.board}
          clickSquare={this.handleClick}
        />
      </div>
    );
  }
}

module.exports = Game;