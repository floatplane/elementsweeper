const React = require('react');

/* Import Components */
const Board = require('./Board');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      width: props.width,
      mines: props.mines,
      board: this.buildBoard(props.height,props.width,props.mines)
    };
  }
  
  buildBoard(height, width, mines) {
    // Generate random mine positions:
    var totalSquares = height * width;
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
      }
      board.push(row);
    }
    
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        board[i][j].neighboring = this.countNeighboringMines(board[i][j]); 
      }
    }
    
    
    return board;
  }
  
  countNeighboringMines(square, board) {
    var neighbors = [
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
    for (var i in neighbors) {
      var n = neighbors[i];
      var pos = 
      board[getNeighborPosition 
    }
    
  }
  
  getNeighborPosition(square) {
    /*
    position = width * rowIndex + colIndex
    
    colIndex, rowIndex
    
    -1,-1| 0,-1| 1,-1  
    -----|-----|-----
    -1, 0|  s  | 1, 0  
    -----|-----|-----
    -1, 1| 0, 1| 1, 1   
    */
    
    return this.state.width * square.rowIndex + square.colIndex;   
  }
  
  render() {
    return (
      <div>
        <h1>Minesweeper</h1>
        <Board
          board={this.state.board}
          
        />
      </div>
    );
  }
}

module.exports = Game;