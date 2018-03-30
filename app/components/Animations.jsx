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
    /*
    var num = 0;
    for (var i = 0; i < bellFactor; i++) {
        num += Math.random() * (max/bellFactor);
    }
    */
    var top = 0
    for (var i = 0; i < 3; i++) {
      top += Math.random() * (1800/3);
    }
    top = Math.floor(top * - 1) - 10;
    console.log(top);
    return {left: left + "vw", top: top + "vh"};
  }
  
  
  
  return (
    <div id="alert-animation-container">
      {items}
    </div>
  );
}

module.exports = Animations;