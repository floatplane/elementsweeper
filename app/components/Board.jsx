const React = require('react');

const Square = require('./Square');



const Row = function(props) {
  
  const squares = props.squares.map((square) => 
    <li>
      {square.position}[{square.colIndex},{square.rowIndex}]: {square.mineStatus ? "M" : "_"}
    </li>
  );
  
  return (
    <ul class="row">
      {squares}
    </ul>
  );
}


function Board(props) {
  const rows = props.board.map((row) =>
    <li>
      <Row squares={row} />                             
    </li>
  );

  
  return (
    <div>
      <h3>Board</h3>
      <h4>{typeof props.board} - {props.board.length}</h4>
      <ul id="board">{rows}</ul>
    </div>
  );
}


module.exports = Board;