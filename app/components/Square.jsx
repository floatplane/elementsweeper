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
  
  function gridSize() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    return (w / props.width) > (h / props.height) ? h * .85 / props.height : w * .85 / props.width;
  }
  
  
  function getStyle() {  
    var size = gridSize();
    return {
      height: size + "px",
      width: size + "px"
    }
  }
  
  function positionLabel() {
    var size = gridSize();
    return {
      lineHeight: (size / 2) + "px",
      fontSize: (size / 2) + "px",
      margin: (size / 4) + ", 0",
      border: "1px dashed pink",
      color: "green"
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
      style={getStyle()}
    >
      <div className={(props.square.clickStatus ? "clicked" : "unclicked") + " square-inner"}>
        <h4 style={positionLabel()}>{getLabel()}</h4>
      </div>
    </li>
  );
}

module.exports = Square;