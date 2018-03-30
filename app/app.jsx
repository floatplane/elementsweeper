const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const Game = require('./components/Game');

ReactDOM.render(<Game width={7} height={7} mines={13} />, document.getElementById('main'));


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
    - Click Status

*/