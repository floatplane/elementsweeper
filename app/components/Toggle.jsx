const React = require('react');
const controlItemContainerStyle = require('./ControlItem');

const Toggle = function(props) {

  const text = props.status ? props.on : props.off;
  
  const toggleStyle = {
    padding: ".2em",
    lineHeight: "130%",
    display: "flex",
    border: "2px solid black",
    borderRadius: "1.5em",
    //width: "5em",
    margin: ".5em 0"
  }
  
  // Using this in Counter also, should merge
  const labelStyle = {
    display: "inline-block",
    width: "auto",
    margin: "1em"
  }
    
  
  const align = props.status ? "left" : "right";
  const statusOrder = props.status ? "0" : "2";
  const statusStyle = {
    textAlign: align,
    padding: ".25em",
    fontSize: "150%",
    width: "100%",
    order: statusOrder
  }
  
  
  const handleContainerStyle = {
    height: "auto",
    width: "100%",
    display: "inline-block"
  }
  
  
  const labelAlign = props.status ? "right" : "left";
  const handleStyle = {
    backgroundColor: "green",
    borderRadius: "50%",
    width: "2em",
    paddingTop: "100%",
    //textAlign: labelAlign,
    order: "1"
  }
  
  
  return (
    <div
      class="control-item-container"
      style={controlItemContainerStyle}  
    >
      <h5
        class="toggle-label"
        style={labelStyle}
      >
        Flag Toggle:
      </h5>
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