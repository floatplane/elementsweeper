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
    var oneDimBoard = []
    for (var i = 0; i < height * width; i++) {
      
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