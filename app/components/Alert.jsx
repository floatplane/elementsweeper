const React = require('react');

const Alert = function(props) {
  
  const hideStatus = props.message ? "" : "hide-alert";

  return (
    <div className={hideStatus + " alert-container"}>
      <div className="alert">
        <div className="close-alert">x</div>
        {props.message}
      </div>
    </div>
  );
}

module.exports = Alert;