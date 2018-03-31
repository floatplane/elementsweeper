const React = require('react');


const Square = function(props) {
  
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
      return false;
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
      margin: ((size / 4) - 2) + "px auto"
    } 
  }
  
  var label = getLabel();
  const labelHeader = label ? <h4 style={positionLabel()}>{label}</h4> : false;
    
  return (
    <li
      onClick={(e) => props.click(e, props.square, "reveal")}
      onContextMenu={(e) => props.click(e, props.square, "flag")}
      style={getStyle()}
    >
      <div className={(props.square.clickStatus ? "clicked" : "unclicked") + " square-inner"}>
        {labelHeader}
      </div>
    </li>
  );
}

module.exports = Square;