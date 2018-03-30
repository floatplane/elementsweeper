const React = require('react');

const Square = require('./Square');


const Row = function(props) {
  
  const squares = props.squares.map((square) => 
    <Square
      key={square.position.toString()}
      square={square}
      click={props.clickSquare}
      //flagSquare={props.flagSquare}
    />
  );
  
  return (
    <ul class="row">
      {squares}
    </ul>
  );
}


function Board(props) {
  const rows = props.board.map((row, index) =>
    <li>
      <Row
        key={index}
        squares={row}
        clickSquare={props.clickSquare}
        //flagSquare={props.flagSquare}
      />                             
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