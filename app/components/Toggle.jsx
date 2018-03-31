const React = require('react');
const controlItem = require('./controlItem');

const Toggle = function(props) {

  const text = props.status ? props.on : props.off;
  
  const toggleStyle = {
    border: "2px solid black",
    borderRadius: "1.5em",
    display: "flex",
    margin: "1.25em 0 1.25em .25em",
    maxHeight: "2.25em",
    backgroundColor: "white"
  }
  
  var labelStyle = controlItem.childLabelStyle
    
  const align = props.status ? "left" : "right";
  const statusOrder = props.status ? "0" : "2";
  const statusStyle = {
    textAlign: align,
    padding: "0 .25em",
    fontSize: "130%",
    order: statusOrder,
    lineHeight: "1.7em"
  }
  
  
  const handleContainerStyle = {
    height: "auto",
    width: "2em",
    display: "inline-block",
  }
  
  
  const handleStyle = {
    backgroundColor: "green",
    borderRadius: "50%",
    width: "80%",
    paddingTop: "80%",
    margin: "10%",
    order: "1"
  }
  
  
  return (
    <div
      class="control-item-container"
      style={controlItem.containerStyle}  
    >
      <div
        class="toggle-label-container"
        style={controlItem.childLabelContainerStyle}
      >
        <h5
          class="toggle-label"
          style={labelStyle}
        >
          Flag Toggle:
        </h5>
      </div>
      <div
        class="toggle"
        style={toggleStyle}
        onClick={props.click}
      >
        <div
          class="toggle-status"
          style={statusStyle}>{text}
        </div>
        <div
          class="toggle-handle-container"
          style={handleContainerStyle}
        >

          <div
            class="toggle-handle"
            style={handleStyle}>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Toggle;