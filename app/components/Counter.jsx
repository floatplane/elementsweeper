const React = require('react');
const controlItem = require('./ControlItem');


const Counter = function(props) {
  
  const counterStyle = Object.assign(
    {},
    controlItem.containerStyle,
    {
      backgroundColor: "#8CF",
      borderRadius: "5px",
      width: "7em",
    }
  )
  
  // Using this in Toggle also, should merge
  var labelStyle = controlItem.childLabelStyle
  
  return (
    <div
      class="control-item-container counter"
      style={counterStyle}  
    >
      <div
        class="counter-label-container"
        style={controlItem.childLabelContainerStyle}
      >
        <h5 style={labelStyle}>{props.label}: {props.count}</h5>
      </div>
    </div>
  );
}

module.exports = Counter;