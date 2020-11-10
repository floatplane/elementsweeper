const React = require('react');

const Square = require('./Square');


const Row = function(props) {
  
  const squares = props.squares.map((square) => 
    <Square
      key={square.position.toString()}
      square={square}
      click={props.clickSquare}
      height={props.height}
      width={props.width}
    />
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
      <Row
        key={row[0].position.toString()}
        squares={row}
        clickSquare={props.clickSquare}
        height={props.height}
        width={props.width}
      />                             
    </li>
  );

  
  return (
    <div id="board_container">
      <ul id="board">{rows}</ul>
    </div>
  );
}


module.exports = Board;