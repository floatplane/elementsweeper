const React = require('react');

/* Import Components */
const Board = require('./Board');

class Game extends React.Component {
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