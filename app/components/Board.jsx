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
      liftSize={props.liftSize}
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
        liftSize={props.liftSize}
      />                             
    </li>
  );

  
  return (
    <div>
      <ul id="board">{rows}</ul>
    </div>
  );
}


module.exports = Board;