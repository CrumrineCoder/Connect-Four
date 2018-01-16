var theBoard = [];
var turn = 1;
var htmlTurn = document.getElementById("TurnIndicator");
var displayTable = document.getElementById("table");
var winner = document.getElementById("playerVictory");
var playerOneVictories = 0;
var playerTwoVictories = 0;
var paused = 0;
// Create the JS array for the board
function createBoard(rows, columns) {
  for (var i = 0; i < rows; i++) {
    theBoard[i] = [];
    for (var j = 0; j < columns; j++) {
      theBoard[i][j] = 0;
    }
  }
}

createBoard(7, 6);
// Create the HTML for the Board 
function maintainBoard() {
  var table = "<br />";
  for (var i = 0; i < theBoard[0].length; i++) {
    for (var j = 0; j < theBoard.length; j++) {
      if (theBoard[j][i] == 1) {
        table += "<div class='blackToken'></div>";
      } else if (theBoard[j][i] == 2) {
        table += "<div class='redToken'></div>";
      } else {
        table += "<div class='greyToken'></div>";
      }
      table += " ";
    }
    table += " <br /> ";
  }
  displayTable.innerHTML = table;
}
// Initial commit to the HTML, blank slate. 
maintainBoard();
function pickColumn(column) {
  if (paused != 1) {
    if (column - 1 > theBoard[0].length || column - 1 < 0) {
      console.log("Off the screen");
    } else if (theBoard[column - 1].indexOf(0) == -1) {
      console.log("Column is full");
    } else {
      var i = theBoard[column - 1].length;
      while (i >= 0) {
        if (
          theBoard[column - 1][i - 1] != 1 &&
          theBoard[column - 1][i - 1] != 2
        ) {
          theBoard[column - 1][i - 1] = turn;
          break;
        }
        i--;
      }
      console.log(areFourConnected(turn));

      updatePlayer();

      maintainBoard();
    }
  }
}
// Check if a player has won.
function areFourConnected(player) {
  // horizontalCheck
  for (var j = 0; j < theBoard[0].length - 3; j++) {
    for (var i = 0; i < theBoard.length; i++) {
      if (
        theBoard[i][j] == player &&
        theBoard[i][j + 1] == player &&
        theBoard[i][j + 2] == player &&
        theBoard[i][j + 3] == player
      ) {
        console.log("frog");
        displayWinner(player);
      }
    }
  }
  // verticalCheck
  for (var i = 0; i < theBoard.length - 3; i++) {
    for (var j = 0; j < theBoard[0].length; j++) {
      if (
        theBoard[i][j] == player &&
        theBoard[i + 1][j] == player &&
        theBoard[i + 2][j] == player &&
        theBoard[i + 3][j] == player
      ) {
        console.log("frog");
        displayWinner(player);
      }
    }
  }
  // ascendingDiagonalCheck
  for (var i = 3; i < theBoard.length; i++) {
    for (var j = 0; j < theBoard[0].length - 3; j++) {
      if (
        theBoard[i][j] == player &&
        theBoard[i - 1][j + 1] == player &&
        theBoard[i - 2][j + 2] == player &&
        theBoard[i - 3][j + 3] == player
      )
        displayWinner(player);
    }
  }
  // descendingDiagonalCheck
  for (var i = 3; i < theBoard.length; i++) {
    for (var j = 3; j < theBoard[0].length; j++) {
      if (
        theBoard[i][j] == player &&
        theBoard[i - 1][j - 1] == player &&
        theBoard[i - 2][j - 2] == player &&
        theBoard[i - 3][j - 3] == player
      )
        displayWinner(player);
    }
  }
}
// Swap turns
function updatePlayer() {
  if (turn == 1) {
    htmlTurn.innerHTML = "Second Player's Turn";
    turn = 2;
  } else if (turn == 2) {
    htmlTurn.innerHTML = "First Player's Turn";
    turn = 1;
  }
}
// Clear the board and unpause the game
function reset() {
  paused = 0;
  theBoard = [];
  createBoard(7, 6);
  maintainBoard();
  winner.innerHTML = "";
}
// Tell the winner they're awesome and pause the game
function displayWinner(player) {
  if (player == 1) {
    playerOneVictories += 1;
    document.getElementById(
      "playerOneVictories"
    ).innerHTML = playerOneVictories;
    winner.innerHTML = "Player One Wins! Press Reset to play again.";
  } else {
    playerTwoVictories += 1;
    document.getElementById(
      "playerTwoVictories"
    ).innerHTML = playerTwoVictories;
    winner.innerHTML = "Player Two Wins! Press Reset to play again.";
  }
  paused = 1;
}
