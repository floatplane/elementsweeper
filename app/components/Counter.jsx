const React = require('react');
const controlItem = require('./controlItem');


const Counter = function(props) {
  
  const counterStyle = Object.assign(
    {},
    controlItem.containerStyle,
    {
      width: "7em",
    }
  )
  
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
        <h5 style={labelStyle}>{props.label}: <strong>{props.count}</strong></h5>
      </div>
    </div>
  );
}

module.exports = Counter;