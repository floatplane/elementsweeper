var board = document.getElementById("board");
var widthForm = document.getElementById("width-form");
var heightForm = document.getElementById("height-form");
var minesForm = document.getElementById("mines-form");


//Placeholder Values:
var width = 10;
var height = 10;
var mines = 10;
var wp1 = 11;
var wm1 = 9;
var neighbors = [];
var squares = [];

var getNeighbors = function(squareId) {
  if (squareId%width === 0) {
    neighbors = [width, wm1, -1, -width, -wp1];
  } else if (squareId%width === wm1) {
    neighbors = [wp1, width, 1, -wm1, -width];
  } else {
    neighbors = [wp1, width, wm1, 1, -1, -wm1, -width, -wp1];
  }
}

var checkNeighbors = function(squareId, checkValue, newValue) {
  for (n in neighbors) {
    if (squares[squareId - neighbors[n]]) {
      if (squares[squareId - neighbors[n]][2] != checkValue){
        squares[squareId - neighbors[n]][2] += newValue;
      }
    }
  } 
}

var drawBoard = function() {
  squares = [];
  
  board.innerHTML = "";

  var width = widthForm.value;
  width = parseInt(width);
  var height = heightForm.value;
  var num_mines = minesForm.value;

  var num_squares = width * height;
  
  if (num_mines > num_squares) {
    alert("Too many mines");
    return
  }
  clearedNeighbors = [];

  // Place Mines:




  for (i = 0; i < width; i++) {
    for(j = 0; j < height; j++) {
        x_coord = i;
        y_coord = j;
        coords = [i, j, 0];
        squares.push(coords);
    }
  }

  for (i = 0; i < num_mines; i++) {
    rand = Math.floor((Math.random() * num_squares));
    if (squares[rand][2] === 0) {
      squares[rand][2] = -1;
    } else {
      i --;
    }
  }

  for (s in squares){
    neighbors = [];
    square = squares[s];
    s1 = parseInt(s) + 1;
    ss = parseInt(s);
    // Find next to mine:
    wm1 = width - 1;
    wp1 = width + 1;
    
    getNeighbors(ss);

    if (square[2] === -1){
      checkNeighbors(ss, -1, 1);
      /*for (n in neighbors) {
        if (squares[ss - neighbors[n]]) {
          if (squares[ss - neighbors[n]][2] != -1){
            squares[ss - neighbors[n]][2] += 1;
          }
        }
      }*/
    }
  }

  // Draw Board:

  var insert = "";

  for (i = 0; i < height; i++) {
    insert += "<div class='row' id='row-" + i + "'>";
    for (j = 0; j < width; j++) {


      index_s = "" + i + j;
      index = parseInt(index_s);
      //console.log(index);
      square = squares[index];

      if (square[2] === -1) {
        insert += "<div class='board-square bomb unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 1) {
        insert += "<div class='board-square one unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 2) {
        insert += "<div class='board-square two unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 3) {
        insert += "<div class='board-square three unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 4) {
        insert += "<div class='board-square four unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 5) {
        insert += "<div class='board-square five unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 6) {
        insert += "<div class='board-square six unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 7) {
        insert += "<div class='board-square seven unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else if (square[2] === 8) {
        insert += "<div class='board-square eight unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      } else {
        insert += "<div class='board-square blank unclicked' id='" + index + "'><div class='index'>" + index + "</div></div>";
      }
    }
    insert += "</div>";
  }


  board.insertAdjacentHTML("beforeend", insert);
}

// Figure out why even though the ids are in clearedNeighbors that they aren't responding to indexOf.

var clearNeighbors = function(squareId) {
  getNeighbors(squareId);
  if (squares[squareId][2] === 0) {
    if (clearedNeighbors.indexOf(squareId) === -1){
      clearedNeighbors.push(squareId);
      console.log("Push: " + squareId);
    }
    for (n in neighbors) {
      otherSquareId = sID - neighbors[n];
      otherSquare = squares[otherSquareId];
      if (otherSquare) {
        otherSquareValue = otherSquare[2];
        otherSquareE = document.getElementById(otherSquareId);
        $( "#" + otherSquareId.toString() ).removeClass("unclicked");
        console.log("ClearedNeighbors: " + clearedNeighbors);
        if (clearedNeighbors.indexOf(parseInt(otherSquareId)) === -1) {
          console.log("Index: " + otherSquareId + " -- " + clearedNeighbors.indexOf(parseInt(otherSquareId)));
          console.log("not done yet " + otherSquareId);
          //clearNeighbors(otherSquareId);
        } else {
          console.log("already done " + otherSquareId);
        }
        // Recursive clearNeighbors() here.
        // Switch clearedSquares to be for clearedNeighbors.
      }
    }
  }
  console.log(clearedNeighbors);
}


$(document).on("click", ".board-square", function() {
  $( this ).removeClass("unclicked");
  
  sID = $( this ).attr("id");
  intsID = parseInt(sID);
  
  /*
  if ( $( this ).hasClass("blank") ) {
    console.log("BLANK! " + sID );
  }
  */
  clearNeighbors(sID);
});


$(document).on("click", ".bomb", function() {
  alert("💣 You lose 💣");
});

