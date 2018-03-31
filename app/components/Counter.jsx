const React = require('react');


const Counter = function(props) {
  
  // Using this in Toggle also, should merge
  const labelStyle = {
    display: "inline-block",
    width: "auto",
    margin: "0 1em"
  }
  
  return (
    <div
      class="counter"
    >
      <h5 style={labelStyle}>{props.label}: {props.count}</h5>
    </div>
  );
}

module.exports = Counter;