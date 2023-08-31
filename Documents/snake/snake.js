var blockSize = 25;
var rows = 20;
var columns= 20;
var board;
var context;




//Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

//Food
var foodX;
var foodY;

//score
var currentScore = 0;
var bestScore = 0;




window.onload = function() {
    startGame();
    document.addEventListener("keyup", changeDirection);
    update();
    setInterval(update, 1000/10); //every 100 milliseconds
}

//gets game to initial start state
function startGame(){
    
    board = document.getElementById("board")
    board.height = 20 * 25;
    board.width = 20 * 25;
    context = board.getContext("2d");
    randomFood();

    snakeX = blockSize * 5;
    

    velocityX = 0;
    velocityY = 0;
    snakeBody = [];

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

}

function playMusic() {
    let play = document.getElementById("play");
    let audio = new Audio("audio.mp3");
    audio.play();
}
play.addEventListener(onclick, playMusic);
//reset game when loss condition occurs
function gameOver(){
    
    alert("Game over");
       
    if (currentScore > bestScore) {
        bestScore = currentScore;
        document.getElementById("bestScore").innerHTML = bestScore;
    }

    currentScore = 0;
    startGame();
    
}

//test currentScore with scores in DataBase to see if it is a high score - work in progress
function testHighScore() {
let play = document.getElementById("music");
}

//get name and post highscore to db - work in progress
function newHighScore() {
    var name = prompt("New High Score!!! Input your name","");
    //need to change url - ask fries in class how ajax works
    new Ajax.Request( "url",
    {
        method:"POST",
        Parameters:{ name, currentScore},
        onSuccess: startGame(),
        onFailure: alert(failure),
        onException: alert(exception)
    }
    );


}

//function to change type of food
function getFoodType(){
    fruit = new Image;
    
    //context.drawImage(fruit, foodX, foodY, board.width, board.height);
    var type = Math.round(Math.random() * (3 - 1 + 1) + 1);
    //apple
    if (type == 1) {
        fruit.src = "apple.gif";
    //orange    
    } else if (type == 2) {
        fruit.src = "orange.png";
    //cherry 
    } else {
        fruit.src = "cherry.png";
     } 
}

//Random spawn for the food. Uses Math.floor to get rid of decimals
function randomFood() {
    getFoodType();
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//change the direction of the snake
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}



//updates game, checks for loss conditions
function update() {

    //keeps background black if fruit/snake is not there
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    //controls food
    //context.fillStyle = color;
    context.drawImage(fruit, foodX, foodY, blockSize, blockSize);

    //shows user their current score
    document.getElementById("currentScore").innerHTML = currentScore;

    //test to see if snake eats food
    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        randomFood();
        currentScore += 1;
    }

    //creates snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    
    if (snakeBody.length) {
        snakeBody[0]= [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i <snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over condition
    if (snakeX < 0 || snakeX > columns*blockSize-1 || snakeY < 0 || snakeY > rows * blockSize-1) {
        gameOver();
    }

    //game over condition
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver();
        }
    }

}



