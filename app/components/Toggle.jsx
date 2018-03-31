const React = require('react');


const Toggle = function(props) {
  
  const text = props.status ? props.on : props.off;
  
  
    
  
  const align = props.status ? "left" : "right";
  const labelStyle = {
    textAlign: align,
    padding: "0 .25em",
    width: "100%"
  }
  
  const handleStyle = {
     
  }
  
  
  return (
    <div class="toggle-container">
    <h4>Flag</h4>
      <div
        class="toggle"
        onClick={props.click}
      >
        <div style={labelStyle}>{text}</div>
        <div style={handleStyle}></div>
      </div>
    </div>
  );
}

module.exports = Toggle;