const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const Game = require('./components/Game');

ReactDOM.render(<Game width={7} height={7} mines={7} />, document.getElementById('main'));


/*

To Do
------

- Set Default Values
  x Width
  x Height
  x Mines
- Draw Board
  x Check there aren't too many mines
  x Set State:
    x Position
    x Value
      x Mine
      x Neighbor
      x Empty
    x Click Status
- Better notifications
x Recursive show on click empty
- Flexbox or CSS Grid for layout
- Visible/Invisible style
- Mark as flagged
- Win animation
- Lose animation
- Story
- Instructions


*/