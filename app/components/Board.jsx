const React = require("react");

const Square = require("./Square");

const Row = function (props) {
  const squares = props.squares.map((square) => (
    <Square
      key={`${square.row},${square.col}`}
      square={square}
      update={props.updateSquare}
      height={props.height}
      width={props.width}
    />
  ));

  return <ul className="row">{squares}</ul>;
};

function Board(props) {
  const rowElements = props.board.map((rowArray) => (
    <li className="row" key={`${rowArray[0].row}`}>
      <Row
        squares={rowArray}
        updateSquare={props.updateSquare}
        height={props.height}
        width={props.width}
      />
    </li>
  ));

  return (
    <div id="board_container">
      <ul id="board">{rowElements}</ul>
    </div>
  );
}

module.exports = Board;
