'use strict';
const minSpeed = 5;                 //Maximum speed of the ball. (x-axis)
const maxSpeed = 40;                 //Maximum speed of the ball. (x-axis)
const paddleSpeed = 15;              //Players paddle speed.
const forward = 1;                   //X-axis positive direction.
const reverse = -1                   //X-axis negative direction.
const startAngle = 0;                //The starting angle for the ball's arc.
const endAngle = Math.PI * 2;        //The finishing angle for the ball's arc.
const ballRadius = 20;               //Radius of the ball.
const ballDiameter = ballRadius * 2; //Diameter of the ball.
let canvas;                          //Canvas object.
let ctx;                             //Canvas context object.
let playerscore;                     //Player score object.
let opponentscore;                   //Opponent score object.
let playerScore = 0;                 //Player's game score.
let opponentScore = 0;               //Opponent's game score.
let angle = 0;                       //Angle is the Y-axis movement. (its not really an angle atm)
let width;                           //Width of the canvas.
let height;                          //Height of the canvas.
let centerX;                         //Ball X-axis position.
let centerY;                         //Ball Y-axis position.
let speed = minSpeed;                //Speed of the ball. (x-axis)
let direction = 1;                   //Direction of the ball. (x-axis)
let paddleOffset = 100;              //The offset distance from the edge of the display to the paddle.
let playerY;                         //Player's paddle location. (top edge)    
let playerPaddleFront;               //X-axis location of the front of the player's paddle.
let playerPaddleBack;                //X-axis location of the back of the player's paddle.
let playerPaddleHeight = 100;        //The height of the player's paddle.
let playerPaddleWidth = 20;          //The width of the player's paddle.
let opponentY;                       //Opponent's paddle location.
let opponentPaddleFront;             //X-axis location of the front of the opponent's paddle.
let opponentPaddleBack;              //X-axis location of the back of the opponent's paddle.
let opponentPaddleHeight = 100;      //The height of the player's paddle.
let opponentPaddleWidth = 20;        //The width of the opponent's paddle.
let keysPressed = {};                //Array to handle multiple keydown events at the same time.

let ping1 = new Audio('/sounds/1.wav');
let ping2 = new Audio('/sounds/2.wav');

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
    if (playerY >= height - playerPaddleHeight) { playerY = height - playerPaddleHeight; }
    if (opponentY <= 0) { opponentY = 0; }
    if (opponentY >= height - opponentPaddleHeight) { opponentY = height - opponentPaddleHeight; }
    if (centerY < ballRadius) { angle = -angle; }
    if (centerY > height - ballRadius) { angle = -angle; }

    centerX += speed * direction;
    centerY += speed * angle;

    if (direction === forward) {
        if ((centerX > opponentPaddleFront - ballRadius) && (centerX < opponentPaddleBack)){
            //check for hit.
            if ((centerY > opponentY - ballRadius) && (centerY < opponentY + opponentPaddleHeight + ballRadius)) {
                ping1.play();
                direction = reverse;
                angle = angle + ((opponentY - centerY - 50) * 0.001);
                speed++;
                if (speed > maxSpeed) {
                    speed = maxSpeed;
                }
            }
        }
        if (centerX > width + ballDiameter) {
            playerScored();
        }
    }
    else {
        if ((centerX < playerPaddleFront + ballRadius) && (centerX > playerPaddleBack)) {
            if ((centerY > playerY - ballRadius) && (centerY < playerY + playerPaddleHeight + ballRadius)) {
                ping2.play();
                direction = forward;
                angle = angle + ((opponentY - centerY - 50) * 0.001);
                speed++;
                if (speed > maxSpeed) {
                    speed = maxSpeed;
                }
            }
        }
        else if (centerX < -ballDiameter) {
            opponentScored();
        }
    }

    //Clear frame.
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas.
    ctx.beginPath();
    //Player paddle.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(playerPaddleBack, playerY, playerPaddleWidth, playerPaddleHeight);
    //Opponent paddle.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(opponentPaddleFront, opponentY, opponentPaddleWidth, opponentPaddleHeight);
    //Ball.
    ctx.beginPath();
    ctx.arc(centerX, centerY, ballRadius, startAngle, endAngle, false);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

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
    playerY = centerY - playerPaddleHeight / 2;
    opponentY = centerY - opponentPaddleHeight / 2;
    speed = minSpeed;
    angle = Math.random() * (-0.2 - 0.2) + -0.2;
    if (direction === forward) {
        direction = reverse;
    }
    else {
        direction = forward;
    }
}

function resize() {
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
    width = canvas.clientWidth;
    height = canvas.clientHeight;

    opponentPaddleFront = width - (paddleOffset + opponentPaddleWidth);
    opponentPaddleBack = width - paddleOffset;
    playerPaddleFront = paddleOffset + playerPaddleWidth;
    playerPaddleBack = paddleOffset;

    resetGame();
}