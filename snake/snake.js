//HTML elements
let startButton = document.getElementById("start-button");
let easyButton = document.getElementById(`easy-button`);
let medButton = document.getElementById(`med-button`);
let hardButton = document.getElementById(`hard-button`);
let scoreP = document.getElementById(`scoreP`);
let hScoreP = document.getElementById(`hScoreP`);

//input booleans
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;

let gameOverBool = true;

let speed = 500;

//grab cells for gameboard
const cellList = document.getElementsByClassName(`cell`);
const cellArray = [...cellList];
let gameBoard = [];
let counter = 0;
//set up 2D array for gameboard
for (let i = 0; i < 16; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 38; j++) {
    gameBoard[i][j] = cellArray[counter];
    counter++;
  }
}

//initial head pos

let headPosY = 5;
let headPosX = 5;
let currentSnakeArr = [gameBoard[headPosY][headPosX]];

let snakeLength = 3;
let score = 0;
let highScore = 0;
let interval = setInterval(moveSnake, speed);

//button event listeners
startButton.addEventListener(`click`, (e) => {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      gameBoard[i][j].style.backgroundColor = `white`;
    }
  }
  headPosY = 5;
  headPosX = 5;
  currentSnakeArr = [gameBoard[headPosY][headPosX]];
  movingRight = true;
  gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
  spawnApple();
  startButton.disabled = true;
  gameOverBool = false;
  score = 0;
  scoreP.innerText = `Score: 0`;
});

easyButton.addEventListener(`click`, updateSpeedEasy);
medButton.addEventListener(`click`, updateSpeedMed);
hardButton.addEventListener(`click`, updateSpeedHard);

//user input
//using keycode which is depreciated but couldnt get it to work using other key event listeners
document.body.addEventListener(`keydown`, (e) => {
  //down
  if (e.keyCode === 40 && movingUp === false) {
    movingDown = true;
    movingUp = false;
    movingLeft = false;
    movingRight = false;
    //up
  } else if (e.keyCode === 38 && movingDown === false) {
    movingDown = false;
    movingUp = true;
    movingLeft = false;
    movingRight = false;
    //left
  } else if (e.keyCode === 37 && movingRight === false) {
    movingDown = false;
    movingUp = false;
    movingLeft = true;
    movingRight = false;
    //right
  } else if (e.keyCode === 39 && movingLeft === false) {
    movingDown = false;
    movingUp = false;
    movingLeft = false;
    movingRight = true;
  }
});
//moves snake and checks for collisions
function moveSnake() {
  if (gameOverBool === false) {
    if (movingRight === true) {
      if (
        gameBoard[headPosY][headPosX + 1] === undefined ||
        gameBoard[headPosY][headPosX + 1].style.backgroundColor === `black`
      ) {
        gameOver();
      } else {
        if (gameBoard[headPosY][headPosX + 1].style.backgroundColor === `red`) {
          eatApple();
        }
        headPosX += 1;
        gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
        cleanUpTail();
        currentSnakeArr.push(gameBoard[headPosY][headPosX]);
      }
    } else if (movingUp === true) {
      if (
        headPosY <= 0 ||
        gameBoard[headPosY - 1][headPosX].style.backgroundColor === `black`
      ) {
        gameOver();
      } else {
        if (gameBoard[headPosY - 1][headPosX].style.backgroundColor === `red`) {
          eatApple();
        }
        headPosY -= 1;
        gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
        cleanUpTail();
        currentSnakeArr.push(gameBoard[headPosY][headPosX]);
      }
    } else if (movingDown === true) {
      console.log(movingDown);
      if (
        headPosY >= 15 ||
        gameBoard[headPosY + 1][headPosX].style.backgroundColor === `black`
      ) {
        gameOver();
      } else {
        if (gameBoard[headPosY + 1][headPosX].style.backgroundColor === `red`) {
          eatApple();
        }
        headPosY += 1;
        gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
        cleanUpTail();
        currentSnakeArr.push(gameBoard[headPosY][headPosX]);
      }
    } else if (movingLeft === true) {
      if (
        gameBoard[headPosY][headPosX - 1] === undefined ||
        gameBoard[headPosY][headPosX - 1].style.backgroundColor === `black`
      ) {
        gameOver();
      } else {
        if (gameBoard[headPosY][headPosX - 1].style.backgroundColor === `red`) {
          eatApple();
        }
        headPosX -= 1;
        gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
        cleanUpTail();
        currentSnakeArr.push(gameBoard[headPosY][headPosX]);
      }
    }
  }
}

function gameOver() {
  gameOverBool = true;
  if (score > highScore) {
    highScore = score;
    hScoreP.innerText = `HighScore: ${highScore}`;
  }
  console.log("GAME OVER");
  startButton.disabled = false;
  snakeLength = 3;
}

function cleanUpTail() {
  if (currentSnakeArr.length === snakeLength) {
    currentSnakeArr[0].style.backgroundColor = `white`;

    currentSnakeArr.shift();
  }
}

function spawnApple() {
  let randomCell =
    gameBoard[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 30)];

  if (randomCell.style.backgroundColor != `black`) {
    randomCell.style.backgroundColor = `red`;
    console.log("Apple Spawned!");
  } else {
    spawnApple();
  }
}

function eatApple() {
  spawnApple();
  snakeLength += 1;
  score += 1;
  scoreP.innerText = `Score: ${score}`;
}

function updateSpeedEasy() {
  speed = 1000;
  clearInterval(interval);
  interval = setInterval(moveSnake, speed);
}
function updateSpeedMed() {
  speed = 500;
  clearInterval(interval);
  interval = setInterval(moveSnake, speed);
}
function updateSpeedHard() {
  speed = 100;
  clearInterval(interval);
  interval = setInterval(moveSnake, speed);
}
