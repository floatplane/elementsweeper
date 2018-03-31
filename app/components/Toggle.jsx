const React = require('react');


const Toggle = function(props) {
  
  const text = props.status ? props.on : props.off;
  
  return (
    <div
      class="toggle"
      onClick={props.click}
    >
      {text}
    </div>
  );
}

module.exports = Toggle;