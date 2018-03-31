const React = require('react');
const controlItem = require('./ControlItem');


const Counter = function(props) {
  
  const counterStyle = {
    display: "inline-block",
    backgroundColor: "#8CF",
    color: "black",
    borderRadius: "5px",
    width: "7em",
    margin: ".5em 0",
    padding: ".5em 0",
  }
  
  // Using this in Toggle also, should merge
  var labelStyle = controlItem.childLabelStyle
  
  return (
    <div
      class="control-item-container"
      style={controlItem.containerStyle}  
    >
      <div
        class="counter"
        style={counterStyle}
      >
        <h5 style={labelStyle}>{props.label}: {props.count}</h5>
      </div>
    </div>
  );
}

module.exports = Counter;