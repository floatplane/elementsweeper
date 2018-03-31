const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const Game = require('./components/Game');

ReactDOM.render(<Game width={2} height={2} mines={1} />, document.getElementById('main'));


/*

To Do
------

x Set Default Values
  x Width
  x Height
  x Mines
~ Change Starting Values
x Draw Board
  x Check there aren't too many mines
  x Set State:
    x Position
    x Value
      x Mine
      x Neighbor
      x Empty
    x Click Status
- Better notifications
  x DOM notifications
  - Style notifications
  - Write better notification copy
x Recursive show on click empty
x Flexbox or CSS Grid for layout
x Visible/Invisible style
x Mark as flagged
x Check for Win on click
x Win animation
x Lose animation
- Story
- Instructions
x Add indexes to board squares
- Move setState in handleClick into function
- Fix longpress
- Reveal mines after win or lose
- Can't lose on first click


*/