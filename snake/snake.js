//HTML elements
let startButton = document.getElementById("start-button");

//input booleans
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;

//grab cells for gameboard
const cellList = document.getElementsByClassName(`cell`);
const cellArray = [...cellList];
let gameBoard = [];
let counter = 0;
//set up 2D array for gameboard
for (let i = 0; i < 20; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 44; j++) {
    gameBoard[i][j] = cellArray[counter];
    counter++;
  }
}

//initial head pos

let headPosY = 10;
let headPosX = 22;
let currentSnakeArr = [gameBoard[headPosY][headPosX]];
console.log(currentSnakeArr);
let snakeLength = 3;
let score = 0;
let highScore = 0;
let interval = setInterval(moveSnake, 1000);

//button event listeners
startButton.addEventListener(`click`, (e) => {
  movingRight = true;
  gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
  spawnApple();
});

//user input
document.body.addEventListener(`keydown`, (e) => {
  //down
  if (e.keyCode === 40) {
    movingDown = true;
    movingUp = false;
    movingLeft = false;
    movingRight = false;
    //up
  } else if (e.keyCode === 38) {
    movingDown = false;
    movingUp = true;
    movingLeft = false;
    movingRight = false;
    //left
  } else if (e.keyCode === 37) {
    movingDown = false;
    movingUp = false;
    movingLeft = true;
    movingRight = false;
    //right
  } else if (e.keyCode === 39) {
    movingDown = false;
    movingUp = false;
    movingLeft = false;
    movingRight = true;
  }

  console.log(movingUp, movingRight, movingDown, movingLeft);
});
//moves snake and checks for collisions
function moveSnake() {
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
      gameBoard[headPosY - 1][headPosX + 1].style.backgroundColor === `black`
    ) {
      gameOver();
    } else {
      if (
        gameBoard[headPosY - 1][headPosX + 1].style.backgroundColor === `red`
      ) {
        eatApple();
      }
      headPosY -= 1;
      gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
      cleanUpTail();
      currentSnakeArr.push(gameBoard[headPosY][headPosX]);
    }
  } else if (movingDown === true) {
    if (
      gameBoard[headPosY + 1][headPosX] === undefined ||
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

function gameOver() {
  clearInterval(interval);
  if (score > highScore) {
    highScore = score;
  }
  console.log("GAME OVER");
}

function cleanUpTail() {
  if (currentSnakeArr.length === snakeLength) {
    currentSnakeArr[0].style.backgroundColor = `white`;
    console.log(currentSnakeArr);
    currentSnakeArr.shift();
    console.log(currentSnakeArr);
  }
}

function spawnApple() {
  let randomCell =
    gameBoard[Math.floor(Math.random() * 18)][Math.floor(Math.random() * 40)];

  if (randomCell.style.backgroundColor != `black`) {
    randomCell.style.backgroundColor = `red`;
  } else {
    spawnApple();
  }
}

function eatApple() {
  spawnApple();
  snakeLength += 1;
  score += 1;
}
