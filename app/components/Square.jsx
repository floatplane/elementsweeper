const React = require('react');


const Square = function(props) {
  return (
    <li onClick={() => props.click(props.square)}>
      <span class="info">
        {props.square.position}[{props.square.colIndex},{props.square.rowIndex}]<br />
        {props.square.clickStatus ? "#" : "_"}  
      </span>
      <h4>{props.square.mineStatus ? "💣" : props.square.neighboring}</h4>
    </li>
  );
}

module.exports = Square;