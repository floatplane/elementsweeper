const React = require('react');


const Toggle = function(props) {
  
  const text = props.status ? props.on : props.off;
  
  // Using this in Counter also, should merge
  const labelStyle = {
    display: "inline-block",
    width: "auto",
    margin: "0 1em"
  }
    
  
  const align = props.status ? "left" : "right";
  const statusStyle = {
    textAlign: align,
    padding: "0 .25em",
    width: "100%"
  }
  
  const labelFloat = props.status ? "right" : "left";
  
  const handleStyle = {
    backgroundColor: "green",
    borderRadius: "100%",
    height: "1em",
    width: "1em",
    float: labelFloat
  }
  
  
  return (
    <div class="toggle-container">
    <h5 style={labelStyle}>Flag Toggle:</h5>
      <div
        class="toggle"
        onClick={props.click}
      >
        <div style={statusStyle}>{text}</div>
        <div style={handleStyle}></div>
      </div>
    </div>
  );
}

module.exports = Toggle;