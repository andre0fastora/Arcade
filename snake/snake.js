//input
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = true;

//grab cells for gameboard
const cellList = document.getElementsByClassName(`cell`);
const cellArray = [...cellList];
let gameBoard = [];
let counter = 0;
//set up 2D array for gameboard
for (let i = 0; i < 19; i++) {
  gameBoard.push([]);
  for (let j = 0; j < 44; j++) {
    gameBoard[i][j] = cellArray[counter];
    counter++;
  }
}

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

//initial head pos

let headPosY = 10;
let headPosX = 22;
gameBoard[headPosY][headPosX].style.backgroundColor = `black`;

let interval = setInterval(moveSnake, 1000);

function moveSnake() {
  if (movingRight === true) {
    gameBoard[headPosY][headPosX].style.backgroundColor = `white`;
    headPosX += 1;
    gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
    console.log(`Moving right`);
  } else if (movingUp === true) {
    gameBoard[headPosY][headPosX].style.backgroundColor = `white`;
    headPosY -= 1;
    gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
  } else if (movingDown === true) {
    gameBoard[headPosY][headPosX].style.backgroundColor = `white`;
    headPosY += 1;
    gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
  } else if (movingLeft === true) {
    gameBoard[headPosY][headPosX].style.backgroundColor = `white`;
    headPosX -= 1;
    gameBoard[headPosY][headPosX].style.backgroundColor = `black`;
  }
}
