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



function Board(props) {
  const n = [1,2,3]
  //const rows = props.board.map((row) => {
  const rows = n.map((row) => {
    <li>
      *{row}                                  
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