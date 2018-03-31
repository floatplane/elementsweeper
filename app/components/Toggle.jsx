const React = require('react');


const Toggle = function(props) {
  
  const text = props.status ? props.on : props.off;
  
  const toggleStyle = {
    padding: ".1em",
    lineHeight: "130%",
    display: "flex"
  }
  
  // Using this in Counter also, should merge
  const labelStyle = {
    display: "inline-block",
    width: "auto",
    margin: "0 1em"
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
  
  const labelAlign = props.status ? "right" : "left";
  
  const handleStyle = {
    backgroundColor: "green",
    borderRadius: "50%",
    width: "100%",
    height: "auto",
    paddingTop: "50%",
    textAlign: labelAlign,
    order: "1"
  }
  
  
  return (
    <div class="toggle-container">
    <h5 style={labelStyle}>Flag Toggle:</h5>
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