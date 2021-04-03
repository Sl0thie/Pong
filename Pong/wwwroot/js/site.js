'use strict';
var canvas;              //Canvas object.
var ctx;                 //Canvas context object.
var playerscore;         //Player score object.
var opponentscore;       //Opponent score object.
var playerScore = 0;     //Player's game score.
var opponentScore = 0;   //Opponent's game score.
var ballRadius = 20;     //Radius of the ball.
var x = 0;
var angle = 0;
var width;               //Width of the canvas.
var height;              //Height of the canvas.
var centerX;             //Ball X-axis position.
var centerY;             //Ball Y-axis position.
var speed = 1;           //Speed of the ball. (x-axis)
var direction = 1;       //Direction of the ball. (x-axis)
const maxSpeed = 10;     //Maximum speed of the ball. (x-axis)
const paddleSpeed = 10;  //Players paddle speed.
var playerY;
var opponentY;
let keysPressed = {};

window.onload = function(){
    initialise();
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function initialise() {
    //window.addEventListener('keydown', onKeyDown);
    canvas = document.getElementsByClassName('canvas')[0], ctx = canvas.getContext('2d');
    playerscore = document.getElementById('playerscore')
    opponentscore = document.getElementById('opponentscore')
    window.addEventListener("resize", resize);
    resize();
    render();
}

function render() {
    if (keysPressed['a']) { playerY = playerY - paddleSpeed; }
    if (keysPressed['z']) { playerY = playerY + paddleSpeed; }
    if (keysPressed['\'']) { opponentY = opponentY - paddleSpeed; }
    if (keysPressed['/']) { opponentY = opponentY + paddleSpeed; }
    if (playerY <= 0) { playerY = 0; }
    if (playerY >= height - 100) { playerY = height - 100; }
    if (opponentY <= 0) { opponentY = 0; }
    if (opponentY >= height - 100) { opponentY = height - 100; }
    if (centerY < ballRadius) { angle = -angle; }
    if (centerY > height - ballRadius) { angle = -angle; }

    centerX += speed * direction;
    centerY += speed * angle;

    if (direction === 1) {
        if ((centerX > width - 140) && (centerX < width - 120)){
            //check for hit.
            if ((centerY > opponentY) && (centerY < opponentY + 100)) {
                direction = -1;
                speed++;
                angle = angle + ((opponentY - centerY - 50) * 0.001);
               
                if (speed > maxSpeed) {
                    speed = maxSpeed;
                }
            }
        }
        if (centerX > width + 40) {
            playerScored();
        }
    }
    else {
        if ((centerX < 140) && (centerX > 120)) {
            if ((centerY > playerY) && (centerY < playerY + 100)) {
                direction = 1;
                speed++;
                angle = angle + ((opponentY - centerY - 50) * 0.001);
                if (speed > maxSpeed) {
                    speed = maxSpeed;
                }
            }
        }
        else if (centerX < -40) {
            opponentScored();
        }
    }

    //Clear frame.
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    //Player
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(100, playerY, 20, 100);
    //Opponent
    ctx.fillStyle = '#FFFFF';
    ctx.fillRect(width - 120, opponentY, 20, 100);
    //Ball
    ctx.beginPath();
    ctx.arc(centerX, centerY, ballRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFFFF';
    ctx.stroke();

    requestAnimationFrame(render);
}

function resetGame() {
    playerScore=0;
    playerscore.innerHTML = playerScore;
    opponentScore=0;
    opponentscore.innerHTML = opponentScore;
    startPoint();
}

function playerScored() {
    console.log("Player Scored");
    playerScore++;
    playerscore.innerHTML = playerScore;
    startPoint();
}

function opponentScored() {
    console.log("Opponent Scored");
    opponentScore++;
    opponentscore.innerHTML = opponentScore;
    startPoint();
}

function startPoint() {
    centerX = width / 2;
    centerY = height / 2;
    playerY = centerY - 50;
    opponentY = playerY;
    speed = 1;
    angle = Math.random() * (-0.2 - 0.2) + -0.2;
    if (direction === 1) {
        direction = -1;
    }
    else {
        direction = 1;
    }
}

function resize() {
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    resetGame();
    //console.log("Width:" + width + " Height:" + height);
}