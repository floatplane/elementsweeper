const React = require('react');

const Alert = function(props) {
  
  const hideStatus = props.message ? "" : "hide-alert";

  return (
    <div className={hideStatus + " alert"}>
      {props.message}
    </div>
  );
}

module.exports = Alert;