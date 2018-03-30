const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const Game = require('./components/Game');

ReactDOM.render(<Game width={13} h/>, document.getElementById('main'));


/*

To Do
------

- Set Default Values
  - Width
  - Height
  - Mines
- Draw Board
  - Check there aren't too many mines
  - Set State:
    - Position
    - Value
      - Mine
      - Neighbor
      - Empty
    - Click Status

*/