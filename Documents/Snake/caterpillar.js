// Javascript code that controls the objects in the game
// Created by Vincent Emery, James Searer, and Asani Bellamy
// Must be used with index.html and caterpillar.css
// COSC365 - Final - 5/3/23

var blockSize = 25;
var rows = 20;
var columns= 20;
var board;
var context;
var objectSize;

//caterpillar
var caterpillarX = blockSize * 5;
var caterpillarY = blockSize * 5;

//var color = "red";

var velocityX = 0;
var velocityY = 0;
var caterpillarBody = [];

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
    board.height = 20 * blockSize;
    board.width = 20 * blockSize;
    context = board.getContext("2d");
    randomFood();

    caterpillarX = blockSize * 5;
    caterpillarY = blockSize * 5;

    velocityX = 0;
    velocityY = 0;
    caterpillarBody = [];

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

}

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

//change the direction of the caterpillar
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

    //keeps background black if fruit/caterpillar is not there
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    //controls food
    //context.fillStyle = color;
    context.drawImage(fruit, foodX, foodY, blockSize, blockSize);

    //shows user their current score
    document.getElementById("currentScore").innerHTML = currentScore;

    //test to see if caterpillar eats food
    if(caterpillarX == foodX && caterpillarY == foodY) {
        caterpillarBody.push([foodX, foodY]);
        randomFood();
        currentScore += 1;
    }

    //creates caterpillar
    for (let i = caterpillarBody.length - 1; i > 0; i--) {
        caterpillarBody[i] = caterpillarBody[i-1];
    }
    
    if (caterpillarBody.length) {
        caterpillarBody[0]= [caterpillarX, caterpillarY];
    }

    context.fillStyle = "lime";
    caterpillarX += velocityX * blockSize;
    caterpillarY += velocityY * blockSize;
    context.fillRect(caterpillarX, caterpillarY, blockSize, blockSize);

    for(let i = 0; i <caterpillarBody.length; i++) {
        context.fillRect(caterpillarBody[i][0], caterpillarBody[i][1], blockSize, blockSize);
    }

    //game over condition
    if (caterpillarX < 0 || caterpillarX > columns*blockSize-1 || caterpillarY < 0 || caterpillarY > rows * blockSize-1) {
        gameOver();
    }

    //game over condition
    for (let i = 0; i < caterpillarBody.length; i++) {
        if (caterpillarX == caterpillarBody[i][0] && caterpillarY == caterpillarBody[i][1]) {
            gameOver();
        }
    }

}



