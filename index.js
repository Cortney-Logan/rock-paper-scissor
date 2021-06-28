//DOM Elements
let start = document.getElementById("start");
let status = document.getElementById("status");
// HTML collection, NOT an array. Use for...of...to iterate over them
// alternatively use Array.from (document.get..) to create an array
let playerMoves = document.getElementsByClassName("playerMove");
let computerMove = document.getElementById("compMove");

// game variables
let interval = 0;
let timer;
let playerScore = 0;
let compScore = 0;

let moves = ["ROCK", "PAPER", "SCISSORS"];
let moveMap = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};

// start button event listener
start.addEventListener("click", startGame);

// start game function that runs the game
function startGame() {
  // disables button once clicked
  start.disabled = true;

  // resets game board
  compMove.disabled = true;
  compMove.innerHTML = "Computer Move";
  for (let move of playerMoves) {
    move.disabled = true;
    move.classList.remove("selected");
  }

  // updates status area to begin count up
  status.innerText = "Starting in...";

  // status displays count up to 3
  // call count up function each second
  timer = setInterval(countUp, 1000);
}

// called in setInterval each second, at 4 seconds activates player turn
function countUp() {
  // increase interval by 1
  interval = interval + 1;

  // status should each interval until it is 4
  if (interval === 4) {
    // set status to "GO"
    status.innerText = "GO!";

    // clears interval
    clearInterval(timer);

    // the user buttons are enabled and user can select an option (RPS)
    // the game records what option is selected
    for (let move of playerMoves) {
      // enables player move buttons
      move.disabled = false;

      // adds event listener to each move to run a turn

      move.addEventListener("click", playerTurn);
    }
  } else {
    // sets status to interval to count 1...2...3...
    status.innerText = interval;
  }
}

// when player selects their choice, runs playerTurn function to let computer pick randomly and determine a winner
function playerTurn(event) {
  // records player move using innerText of event
  let playerChoice = event.target.innerText;

  // adds selected class to selected button
  event.target.classList.add("selected");

  // computer will randomly select a move by choosing a random index from moves array
  let compChoice = moves[Math.floor(Math.random() * 3)];

  // displays computer's move
  compMove.disabled = false;
  compMove.innerHTML = compChoice;

  // determines winner
  let winner = determineWinner(playerChoice, compChoice);

  // if both pick the same choice it is a draw
  if (winner === "draw") {
    status.innerText = `It's a draw....Score ${playerScore} - ${compScore}`;
  }
  // if computer wins
  else if (winner === "comp") {
    compScore = compScore + 1;
    status.innerText = `Computer Wins! Score ${playerScore} - ${compScore}`;
  }
  // if player wins
  else {
    playerScore = playerScore + 1;
    status.innerText = `You Win! Score ${playerScore} - ${compScore}`;
  }

  // resets game board and allows play again
  start.disabled = false;
  interval = 0;
}

// compares player and computer choices and returns winner
function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }
  // formula to determine and declare winner
  // if difference mode 3 is 1, computer has won
  else if ((moveMap[computer] - moveMap[player] + 3) % 3 === 1) {
    return "comp";
  } else {
    return "player";
  }
}
