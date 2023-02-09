//html elemenets
let select2pGameButton = document.getElementById(`select2pGame`);
let select1pGameButton = document.getElementById(`select1pGame`);
let singlePlayerName = document.getElementById(`singlePlayerName`);
let player1P = document.getElementById(`player1P`);
let player2P = document.getElementById(`player2P`);
let player1NameForm = document.getElementById(`player1Name`);
let player2NameForm = document.getElementById(`player2Name`);
let vsPlayerH2 = document.getElementById(`vsPlayerH2`);
let vsCpuH2 = document.getElementById(`vsCpuH2`);
let startButton = document.getElementById(`start-button`);

let gameBoardDisplay = document.getElementById(`gameBoardDisplay`);

let player1Name = ``;
let player2Name = ``;

let cellList = document.getElementsByClassName(`cell`);
let cellArray = [...cellList];

let gameBoard = [];
let counter = 0;

for (let i = 0; i < 3; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 3; j++) {
    gameBoard[i].push(cellArray[counter]);
    counter++;
  }
}
console.log(gameBoard);

//toggle for cpu game or 2 player game
let singlePlayerBool = true;

let gameRunning = false;
let currentTurn = `green`;
let cellsRemaining = 9;

//event listeners
select2pGameButton.addEventListener(`click`, (e) => {
  player1Name = player1NameForm.value;
  player2Name = player2NameForm.value;
  player1P.innerText = `Player One: ${player1Name}`;
  player2P.innerText = `Player Two: ${player2Name}`;
  player1NameForm.value = ``;
  player2NameForm.value = ``;
  singlePlayerBool = false;
  vsPlayerH2.classList.add(`selected`);
  vsCpuH2.classList.remove(`selected`);
});

select1pGameButton.addEventListener(`click`, (e) => {
  player1Name = singlePlayerName.value;
  player2Name = `CPU`;
  player1P.innerText = `Player One: ${player1Name}`;
  player2P.innerText = `Player Two: ${player2Name}`;
  singlePlayerName.value = ``;
  singlePlayerBool = true;
  vsPlayerH2.classList.remove(`selected`);
  vsCpuH2.classList.add(`selected`);
});

startButton.addEventListener(`click`, (e) => {
  startButton.disabled = true;
  gameRunning = true;
  cellsRemaining = 9;

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      gameBoard[i][j].style.backgroundColor = `white`;
    }
  }

  player1P.innerText = `Player One: ${player1Name}`;
  player2P.innerText = `Player Two: ${player2Name}`;

  let ran = Math.floor(Math.random() * 2);
  if (ran === 1) {
    currentTurn = `green`;
    player1P.style.color = `green`;
    player2P.style.color = `black`;
  } else {
    currentTurn = `red`;
    player1P.style.color = `black`;
    player2P.style.color = `red`;
    if (singlePlayerBool) {
      cpuTurn();
    }
  }
});

gameBoardDisplay.addEventListener(`click`, (e) => {
  if (gameRunning === true && e.target.matches(`.cell`)) {
    if (
      e.target.style.backgroundColor === `` ||
      e.target.style.backgroundColor === `white`
    ) {
      e.target.style.backgroundColor = currentTurn;
      if (currentTurn === `red`) {
        currentTurn = `green`;
        player1P.style.color = `green`;
        player2P.style.color = `black`;
      } else {
        currentTurn = `red`;
        player1P.style.color = `black`;
        player2P.style.color = `red`;
      }

      checkForWin();

      if (singlePlayerBool) {
        cpuTurn();
      }
    }
  }
});

function cpuTurn() {
  let ran1 = Math.floor(Math.random() * 3);

  let ran2 = Math.floor(Math.random() * 3);

  if (
    gameBoard[ran1][ran2].style.backgroundColor === `white` ||
    gameBoard[ran1][ran2].style.backgroundColor === ``
  ) {
    gameBoard[ran1][ran2].style.backgroundColor = currentTurn;
    checkForWin();
    if (currentTurn === `red`) {
      currentTurn = `green`;
      player1P.style.color = `green`;
      player2P.style.color = `black`;
    } else {
      currentTurn = `red`;
      player1P.style.color = `black`;
      player2P.style.color = `red`;
    }
  } else {
    cpuTurn();
  }
}

function checkForWin() {
  //check all green winning possibilities
  if (
    gameBoard[0][0].style.backgroundColor === `green` &&
    gameBoard[0][1].style.backgroundColor === `green` &&
    gameBoard[0][2].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[1][0].style.backgroundColor === `green` &&
    gameBoard[1][1].style.backgroundColor === `green` &&
    gameBoard[1][2].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[2][0].style.backgroundColor === `green` &&
    gameBoard[2][1].style.backgroundColor === `green` &&
    gameBoard[2][2].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[0][0].style.backgroundColor === `green` &&
    gameBoard[1][0].style.backgroundColor === `green` &&
    gameBoard[2][0].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[0][1].style.backgroundColor === `green` &&
    gameBoard[1][1].style.backgroundColor === `green` &&
    gameBoard[2][1].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[0][2].style.backgroundColor === `green` &&
    gameBoard[1][2].style.backgroundColor === `green` &&
    gameBoard[2][2].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[0][0].style.backgroundColor === `green` &&
    gameBoard[1][1].style.backgroundColor === `green` &&
    gameBoard[2][2].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  if (
    gameBoard[0][2].style.backgroundColor === `green` &&
    gameBoard[1][1].style.backgroundColor === `green` &&
    gameBoard[2][0].style.backgroundColor === `green`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player1Name} Wins!`;
  }
  //check all red winning possibilities

  if (
    gameBoard[0][0].style.backgroundColor === `red` &&
    gameBoard[0][1].style.backgroundColor === `red` &&
    gameBoard[0][2].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[1][0].style.backgroundColor === `red` &&
    gameBoard[1][1].style.backgroundColor === `red` &&
    gameBoard[1][2].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[2][0].style.backgroundColor === `red` &&
    gameBoard[2][1].style.backgroundColor === `red` &&
    gameBoard[2][2].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[0][0].style.backgroundColor === `red` &&
    gameBoard[1][0].style.backgroundColor === `red` &&
    gameBoard[2][0].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[0][1].style.backgroundColor === `red` &&
    gameBoard[1][1].style.backgroundColor === `red` &&
    gameBoard[2][1].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[0][2].style.backgroundColor === `red` &&
    gameBoard[1][2].style.backgroundColor === `red` &&
    gameBoard[2][2].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[0][0].style.backgroundColor === `red` &&
    gameBoard[1][1].style.backgroundColor === `red` &&
    gameBoard[2][2].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `${player2Name} Wins!`;
  }
  if (
    gameBoard[0][2].style.backgroundColor === `red` &&
    gameBoard[1][1].style.backgroundColor === `red` &&
    gameBoard[2][0].style.backgroundColor === `red`
  ) {
    gameRunning = false;
    startButton.disabled = false;
    player2P.innerText = `${player2Name} Wins!`;
  }

  cellsRemaining--;
  if (cellsRemaining === 0 && gameRunning === true) {
    gameRunning = false;
    startButton.disabled = false;
    player1P.innerText = `DRAW`;
    player2P.innerText = `DRAW`;
  }
}
