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
        board[i][j].neighboring = this.countNeighboringMines(board[i][j], board, width, height); 
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