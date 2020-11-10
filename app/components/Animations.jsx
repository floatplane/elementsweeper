const React = require('react');


const Animations = function(props) {
  
  function getIcon(i) {
    var winIcons = ["👒","🎩","🎓","🥇","👑","🕶","🐣","☘️","🌈","⚡️","🎈","🎏","🎉","🎊","📎","💯","🐬"];
    var loseIcons = ["🍃","🥀","☄️","🌩","💦","🎭","🔮","❌","🌀","♣️","🏁"];
    var set = props.win ? winIcons : loseIcons;
    return set[i % set.length];
  }
  
  
  function getItems() {
    var newAnimationItems = [];
    if (props.win || props.lose) {
      for (var i = 0; i < 600; i++) {
        newAnimationItems.push({icon: getIcon(i), id: newAnimationItems.length});
      }
    }
    return newAnimationItems;
  }
  
  const items = getItems().map((i) =>
    <div
      key={i.id}
      class="alert-animation-item"
      style={place()}
    >
      {i.icon}                  
    </div>                                                   
  );
                                
  function place() {
    var left = Math.floor(Math.random() * 120) - 10;
    var top = Math.floor((((Math.random() * Math.random() * Math.random())  +  Math.random())/2) * -2800) - 10;
    return {left: left + "vw", top: top + "vh"};
  }
  
  
  
  return (
    <div id="alert-animation-container">
      {items}
    </div>
  );
}

module.exports = Animations;