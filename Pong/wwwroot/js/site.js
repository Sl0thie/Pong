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
let ping3 = new Audio('/sounds/3.wav');
let ping4 = new Audio('/sounds/4.wav');
let ping5 = new Audio('/sounds/5.wav');
let ping6 = new Audio('/sounds/6.wav');
let ping7 = new Audio('/sounds/7.wav');
let ping8 = new Audio('/sounds/8.wav');
let ping9 = new Audio('/sounds/9.wav');
let ping10 = new Audio('/sounds/10.wav');
let ping11 = new Audio('/sounds/11.wav');
let ping12 = new Audio('/sounds/12.wav');
let ping13 = new Audio('/sounds/13.wav');
let ping14 = new Audio('/sounds/14.wav');
let ping15 = new Audio('/sounds/15.wav');
let ping16 = new Audio('/sounds/16.wav');
let ping17 = new Audio('/sounds/17.wav');
let ping18 = new Audio('/sounds/18.wav');
let ping19 = new Audio('/sounds/19.wav');
let ping20 = new Audio('/sounds/20.wav');
let ping21 = new Audio('/sounds/21.wav');
let ping22 = new Audio('/sounds/22.wav');
let ping23 = new Audio('/sounds/23.wav');
let ping24 = new Audio('/sounds/24.wav');
let ping25 = new Audio('/sounds/25.wav');
let ping26 = new Audio('/sounds/26.wav');
let ping27 = new Audio('/sounds/27.wav');
let ping28 = new Audio('/sounds/28.wav');
let ping29 = new Audio('/sounds/29.wav');
let ping30 = new Audio('/sounds/30.wav');
let ping31 = new Audio('/sounds/31.wav');
let ping32 = new Audio('/sounds/32.wav');
let ping33 = new Audio('/sounds/33.wav');
let ping34 = new Audio('/sounds/34.wav');
let ping35 = new Audio('/sounds/35.wav');

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

function playPing() {

    switch (Math.floor((Math.random() * 35) + 1)) {
        case 1:
            ping1.play();
            break;
        case 2:
            ping2.play();
            break;
        case 3:
            ping3.play();
            break;
        case 4:
            ping4.play();
            break;
        case 5:
            ping5.play();
            break;
        case 6:
            ping6.play();
            break;
        case 7:
            ping7.play();
            break;
        case 8:
            ping8.play();
            break;
        case 9:
            ping9.play();
            break;
        case 10:
            ping10.play();
            break;
        case 11:
            ping11.play();
            break;
        case 12:
            ping12.play();
            break;
        case 13:
            ping13.play();
            break;
        case 14:
            ping14.play();
            break;
        case 15:
            ping15.play();
            break;
        case 16:
            ping16.play();
            break;
        case 17:
            ping17.play();
            break;
        case 18:
            ping18.play();
            break;
        case 19:
            ping19.play();
            break;
        case 20:
            ping20.play();
            break;
        case 21:
            ping21.play();
            break;
        case 22:
            ping22.play();
            break;
        case 23:
            ping23.play();
            break;
        case 24:
            ping24.play();
            break;
        case 25:
            ping25.play();
            break;
        case 26:
            ping26.play();
            break;
        case 27:
            ping27.play();
            break;
        case 28:
            ping28.play();
            break;
        case 29:
            ping29.play();
            break;
        case 30:
            ping30.play();
            break;
        case 31:
            ping31.play();
            break;
        case 32:
            ping32.play();
            break;
        case 33:
            ping33.play();
            break;
    }
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
    if (centerY < ballRadius)
    {
        angle = -angle;
        playPing();
    }
    if (centerY > height - ballRadius)
    {
        angle = -angle;
        playPing();
    }

    centerX += speed * direction;
    centerY += speed * angle;

    if (direction === forward) {
        if ((centerX > opponentPaddleFront - ballRadius) && (centerX < opponentPaddleBack)){
            //check for hit.
            if ((centerY > opponentY - ballRadius) && (centerY < opponentY + opponentPaddleHeight + ballRadius)) {
                playPing();
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
                playPing();
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