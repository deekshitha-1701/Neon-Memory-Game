const colors = ["red","blue","green","yellow"];

let gameSequence = [];
let userSequence = [];

let level = 0;
let highScore = 0;

let started = false;

const levelDisplay =
document.getElementById("level");

const highScoreDisplay =
document.getElementById("highScore");

const startBtn =
document.getElementById("startBtn");

const gameContainer =
document.querySelector(".game-container");

/* START */

startBtn.addEventListener("click",()=>{

  if(!started){

    started = true;

    startBtn.style.display = "none";

    level = 0;

    gameSequence = [];

    nextLevel();
  }

});

/* NEXT LEVEL */

function nextLevel(){

  userSequence = [];

  level++;

  levelDisplay.innerText = level;

  if(level > highScore){
    highScore = level;
    highScoreDisplay.innerText = highScore;
  }

  const randomColor =
  colors[Math.floor(Math.random()*4)];

  gameSequence.push(randomColor);

  playSequence();
}

/* PLAY SEQUENCE */

function playSequence(){

  let i = 0;

  const interval = setInterval(()=>{

    flashButton(gameSequence[i]);

    i++;

    if(i >= gameSequence.length){
      clearInterval(interval);
    }

  },700);
}

/* FLASH EFFECT */

function flashButton(color){

  const btn =
  document.getElementById(color);

  btn.classList.add("flash");

  setTimeout(()=>{
    btn.classList.remove("flash");
  },500);

}

/* USER CLICK */

colors.forEach(color=>{

  document.getElementById(color)
  .addEventListener("click",()=>{

    if(!started) return;

    userSequence.push(color);

    flashButton(color);

    checkAnswer(userSequence.length - 1);

  });

});

/* CHECK ANSWER */

function checkAnswer(index){

  if(userSequence[index] === gameSequence[index]){

    if(userSequence.length === gameSequence.length){

      setTimeout(()=>{
        nextLevel();
      },1000);

    }

  }else{

    gameOver();

  }
}

/* GAME OVER */

function gameOver(){

  started = false;

  gameContainer.classList.add("shake");

  setTimeout(()=>{
    gameContainer.classList.remove("shake");
  },300);

  levelDisplay.innerText = "0";

  startBtn.style.display = "inline-block";

  alert("Game Over!");

}