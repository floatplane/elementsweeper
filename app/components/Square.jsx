const React = require('react');


const Square = function(props) {
  
  /*
  // Could use this for long press on desktop instead of right click
  var touchTimer;
  
  function handleTouchStart() {
    var touchTimer = setTimeout(() => console.log('long press activated'), 1500);
  }
  
  function handleTouchEnd() {
    clearTimeout(touchTimer);
  }
  */
  
  function getLabel() {
    if (props.square.flagStatus) {
      return "🎏"; 
    } else if (props.square.clickStatus) {
      if (props.square.mineStatus) {
        return "🔑";
      } else {
        if (props.square.neighboringMines) {
          return props.square.neighboringMines;
        } else {
          return "\u00A0";
        }
      }
    } else {
      console.log("No");
    }
  }
  
    
  return (
    <li
      onClick={() => props.click(false, props.square, "reveal")}
      onContextMenu={(e) => {
        e.preventDefault();
        props.click(false, props.square, "flag");
        
      }}
      /*onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}*/
      className={props.square.clickStatus ? "clicked" : "unclicked"}
    >
      <span class="info">
        {props.square.position}[{props.square.colIndex},{props.square.rowIndex}]<br />
        {props.square.clickStatus ? "#" : "_"} / {props.square.flagStatus ? "~" : "-"}  
      </span>
      {/*<h4>{props.square.mineStatus ? "💣" : props.square.neighboringMines > 0 ? props.square.neighboringMines : "\u00A0"}</h4>*/}
      <h4>{getLabel()}</h4>
    </li>
  );
}

module.exports = Square;