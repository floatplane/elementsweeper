const React = require('react');

const Square = require('./Square');



const Row = function(props) {
  
  const squares = props.squares.map((square) => {
    <li>
      {square.position}
    </li>
  });
  
  

  return (
    <ul>
      {squares}
    </ul>
  );
}



const Board = function(props) {
  
  const rows = props.board.map((row) => {
    <li>
      <Row squares={row} />                                   
    </li>
  });
  
  return (
    <div>
      <h3>Board</h3>
      <h4>{typeof props.board} - {props.board.length}</h4>
      <ul id="board">{rows}</ul>
    </div>
  );
}

module.exports = Board;