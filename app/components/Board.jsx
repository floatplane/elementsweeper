const React = require('react');

const Square = require('./Square');



const Board = function(props) {
  
  const squares = props.board.map((row) => {
    <li>
      <ul>
        !{row}
      </ul>                                   
    </li>
  });
  
  return (
    <div>
      <h3>Board</h3>
      <h4>{typeof props.board} - {props.board.length}</h4>
      <p>{props.board}</p>
      <ul>{squares}</ul>
    </div>
  );
}

module.exports = Board;