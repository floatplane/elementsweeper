const React = require('react');


const Animations = function(props) {
  
  const items = props.items.map((i) =>
    <div
      key={i.id}
      class="alert-animation-item"
      style={place()}
    >
      {i.icon}                  
    </div>                                                   
  );
                                
  for (var i in props.items) {
    console.log(props.items[i]);
  }
                                
  function place() {
    return Math.floor(Math.random() * 120) - 10;
  }
  
  
  
  return (
    <div id="alert-animation-container">
      {items}
    </div>
  );
}

module.exports = Animations;