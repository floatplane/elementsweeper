const React = require('react');

/* Import Components */
const Board = require('./Board');
const Alert = require('./Alert');
const Animations = require('./Animations');
const Toggle = require('./Toggle');
const Counter = require('./Counter');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickMine = this.clickMine.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.state = {
      alertMessage: "",
      win: false,
      lose: false,
      flagClick: false,
      flagCount: 0,
      height: props.height,
      width: props.width,
      mines: props.mines,
      board: this.buildBoard(props.height,props.width,props.mines)
    };
  }
  
  resize() {
    this.forceUpdate();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.win) {
      var win = this.checkWin();
      if (win) {
        console.log("You Win!!");
        this.setState({
          alertMessage: "You Win!",
          win: true
        });
      }
    }
  }
  
  buildBoard(height, width, mines) {
    var totalSquares = height * width;
    
    // Make sure there aren't more mines than squares
    if (mines >= totalSquares) {
      mines = totalSquares - 1;
    }
    
    // Generate random mine positions:
    var mineArray = [];
    for (var i = 0; i < mines; i++) {
      var position = Math.floor(Math.random() * totalSquares);
      if (mineArray.indexOf(position) === -1) {
        mineArray.push(position); 
      } else {
        i--
      }
    }
    
    // Create one dimensional array
    var oneDimBoard = [];

    for (var i = 0; i < totalSquares; i++) {
      // Check if square is a mine
      var mineStatus = false;
      if (mineArray.indexOf(i) >= 0) {
        mineStatus = true;
      }
      // Create square object
      var square = {
        position: i,
        mineStatus: mineStatus
      };
      // Add square to one dimensional array
      oneDimBoard.push(square);     
    }
    // Split one dimensional array into two dimensional array
    var board = [];
    for (var i = 0; i < height; i++) {
      var startSlice = width * i;
      var endSlice = (width * (i + 1));
      var row = oneDimBoard.slice(startSlice, endSlice);
      for (var j in row) {
        row[j].rowIndex = i;
        row[j].colIndex = j;
        row[j].clickStatus = false;
        row[j].flagStatus = false;
      }
      board.push(row);
    }
    
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        board[i][j].neighboringMines = this.countNeighboringMines(board[i][j], board, width, height); 
      }
    }
    
    
    return board;
  }
  
  getNeighbors(square, width, height) {
    var boardIndexNeighbors = [];
    var relNeighbors = [
      [-1,-1],
      [ 0,-1],
      [ 1,-1],
      [-1, 0],
//not [ 0, 0]
      [ 1, 0],
      [-1, 1],
      [ 0, 1],
      [ 1, 1]
    ]
    var absNeighbors = relNeighbors.map(
      s => s.map(
        (c, i) => i === 0 ? c + parseInt(square.colIndex) : c + parseInt(square.rowIndex)   
    ));
    //return absNeighbors;
    for (var i in absNeighbors) {
      var n = absNeighbors[i];
      if (n[0] >= 0 && n[1] >= 0 && n[0] < width && n[1] < height) {
        // row, column are reversed order as array indexes
        boardIndexNeighbors.push({colIndex: n[0], rowIndex: n[1]});
      }
    }
    return boardIndexNeighbors;
  }
  
  countNeighboringMines(square, board, width, height) {
    
    var neighboringMines = 0;
    var boardIndexNeighbors = this.getNeighbors(square, width, height);
    for (var i in boardIndexNeighbors) {
      var r = boardIndexNeighbors[i].rowIndex;
      var c = boardIndexNeighbors[i].colIndex;
      var nSq = board[r][c];
      if (nSq.mineStatus) {
        neighboringMines++; 
      }
    }
    return neighboringMines;
  }
  
  revealNeighbors(square, board) {
    /*
    for neighbors of non mine-neighbor square:
      reveal (as if you clicked on it)
      (if it's also empty click functionality should start recursion)
    */
    var boardIndexNeighbors = this.getNeighbors(square, this.state.width, this.state.height);
    for (var i in boardIndexNeighbors) {
      var r = boardIndexNeighbors[i].rowIndex;
      var c = boardIndexNeighbors[i].colIndex;
      if (!board[r][c].clickStatus) {
        this.handleClick(false, board[r][c], "autoReveal");
      }
    } 
  }
  
  handleClick(e, square, type) {
    console.log(e);
    if (e) {
      e.preventDefault();
    }
    if ((type === "reveal"  && !this.state.flagClick) || type === "autoReveal") {
      if (!square.clickStatus && !square.flagStatus) {
        // If square clicked is a mine neighbor do nothing except reveal
        var callback = () => {};
        if (square.mineStatus) {
          // If square clicked is a mine trigger lose game
          callback = this.clickMine;
        } else if (!square.neighboringMines) {
          // If square clicked is not a mine neighbor start recursive reveal
          callback = (board) => this.revealNeighbors(square, board);
        }    
        var updatedBoard;
        this.setState((prevState, props) => {
          updatedBoard = prevState.board;
          updatedBoard[square.rowIndex][square.colIndex].clickStatus = true;
          return {
            board: updatedBoard
          };
        },() => callback(updatedBoard));
      }
    } else {
      if (!square.clickStatus) {
        var flagStatus = true;
        var flagChange = 1;
        if (square.flagStatus) {
          flagStatus = false;
          flagChange = -1;
        }
        this.setState((prevState, props) => {
          updatedBoard = prevState.board;
          updatedBoard[square.rowIndex][square.colIndex].flagStatus = flagStatus;
          return {
            board: updatedBoard,
            flagCount: prevState.flagCount + flagChange
          };
        });
      }
    }
  }
    
  
  clickMine() {
    //alert("You Lose");
    setTimeout(function() {
      this.setState({
        alertMessage: "You Lose",
        lose: true
      });
    }.bind(this), 500);
  }
  
  checkWin() {
    if (!this.state.lose) {
      var win = true;
      for (var i in this.state.board) {
        for (var j in this.state.board[i]) {
          var square = this.state.board[i][j];
          if (!square.clickStatus && !square.mineStatus) {
            win = false;
            break;
          }
        }
        if (!win) {
          break;
        }
      }
      return win;
    } else {
      return false;
    }
  }
  
  handleToggle() {
    this.setState((prevState, props) => {
      return {
        flagClick: !prevState.flagClick
      };
    });
  }
  
  handleCloseAlert() {
    this.setState({
      alertMessage: ""
    });
  }
  
  
  render() {
    return (
      <div>
        <Animations win={this.state.win} lose={this.state.lose} />
        <div id="game-container">
          <h1 id="site-title">Beachcomber</h1>
          <Alert
            message={this.state.alertMessage}
            close={this.handleCloseAlert}
          />
          <div id="controls-container">
            
            <Counter
              count={this.state.flagCount}
              label={"Flags"}
            />
            <Toggle
              status={this.state.flagClick}
              off={"👁"}
              on={"🎏"}
              click={this.handleToggle}
            />
              
          </div>
          
          <Board
            board={this.state.board}
            clickSquare={this.handleClick}
            height={this.state.height}
            width={this.state.width}
          />

        </div>
      </div>
    );
  }
}

module.exports = Game;