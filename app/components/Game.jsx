const React = require('react');

/* Import Components */
const Board = require('./Board');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.buildBoard(3,3,4)
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
      board.push(oneDimBoard.slice(startSlice, endSlice));
    }
    console.log(board);
    return board;
  }
  
  render() {
    return (
      <div>
        <h1>Minesweeper</h1>
        <Board />
      </div>
    );
  }
}

module.exports = Game;