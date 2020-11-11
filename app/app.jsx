const React = require("react");
const ReactDOM = require("react-dom");
const { ThemeProvider, createMuiTheme } = require("@material-ui/core/styles");
const CssBaseline = require("@material-ui/core/CssBaseline");

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

/* Import Components */
const Game = require("./components/Game");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Game width={9} height={9} mines={10} />
  </ThemeProvider>,
  document.getElementById("main")
);

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
x Better notifications
  x DOM notifications
  x Style notifications  
x Recursive show on click empty
x Flexbox or CSS Grid for layout
x Visible/Invisible style
x Mark as flagged
x Check for Win on click
x Win animation
x Lose animation
- Theme
  x Story
  x Instructions
  - Write better notification copy
  x Background Pattern
  x Change colors
  x Add more varied emojis
x Add indexes to board squares
- Move setState in handleClick into function
~ Fix longpress
x Toggle for flags
x Reveal mines after win or lose
- Can't lose on first click
x Flag Counter
x Can't flag clicked square
x Style Toggle

*/
