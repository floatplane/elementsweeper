const React = require('react');


const Alert = function(props) {
  return (
    <div class="alert">
      {props.message}
    </div>
  );
}

module.exports = Alert;