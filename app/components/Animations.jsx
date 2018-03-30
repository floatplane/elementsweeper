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
  
  /*
  for (var i in props.items) {
    console.log(props.items[i]);
  }
  */
                                
  function place() {
    var left = Math.floor(Math.random() * 120) - 10;
    var top = (Math.floor(Math.random() * 400) * -1) - 15;  
    return {left: left + "vw", top: top + "vh"};
  }
  
  
  
  return (
    <div id="alert-animation-container">
      {items}
    </div>
  );
}

module.exports = Animations;