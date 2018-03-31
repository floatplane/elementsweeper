const React = require('react');


const Counter = function(props) {
  
  return (
    <div
      class="counter"
    >
      {props.label}: {props.count}
    </div>
  );
}

module.exports = Counter;