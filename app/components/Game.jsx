const React = require('react');

/* Import Components */
const Board = require('./Board');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: []
    };
  }
  
  buildBoard(height, width, mines) {
    // Generate random mine positions:
    var mines = [];
    for (var i = 0; i < mines; i++) {
      var position = Math.floor(Math.random() * mines);
      if (mines.indexOf(position) === -1) {
        mines.push(position); 
      } else {
        i--
      }
    }
    
    var oneDimBoard = [];
    var totalSquares = height * width;
    for (var i = 0; i < totalSquares; i++) {
      // Check if square is a mine
      var mineStatus = false;
      if (mines.indexOf(i)) {
        mineStatus = true;
      }
      // Create square obje
      var square = {
        position: i,
        mineStatus: mineStatus
      };
      oneDimBoard.push(square);
      
    }
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