const React = require('react');


const Square = function(props) {
  return (
    <li
      onClick={() => props.click(props.square)}
      onContextMenu={(e) => props.flagSquare(e, props.square)}
      className={props.square.clickStatus ? "clicked" : "unclicked"}
    >
      <span class="info">
        {props.square.position}[{props.square.colIndex},{props.square.rowIndex}]<br />
        {props.square.clickStatus ? "#" : "_"}  
      </span>
      <h4>{props.square.mineStatus ? "💣" : props.square.neighboringMines > 0 ? props.square.neighboringMines : "\u00A0"}</h4>
    </li>
  );
}

module.exports = Square;