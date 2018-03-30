const React = require('react');


const Animations = function(props) {
  
  const items = props.items.map((i, index) =>
    <div
      key={index}
      class="alert-animation-item"
      style={{left: placeHorizontally() + "vw"}}
    >
      {i}                  
    </div>                                                   
  );
                                
  function placeHorizontally() {
    return Math.floor(Math.random() * 120) - 10;
  }
  
  
  
  return (
    <div id="alert-animation-container">
      {items}
    </div>
  );
}

module.exports = Animations;