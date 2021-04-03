'use strict';
var canvas;
var ctx;
var playerscore;
var oppoentscore;
var playerScore = 0;
var oppoentScore = 0;
var ballRadius = 20;
var x = 0;
var angle = 0;
var width; 
var height;

var centerX;
var centerY;
var speed = 1;
var direction = 1;
var maxSpeed = 10;

var playerY = 300;
var oppoentY = 300;

var playerspeed = 0;
var oppoentspeed = 0;



let keysPressed = {};



window.onload = function(){
    initialise();
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    //delete this.keysPressed[event.key];
    keysPressed[event.key] = false;
});

function initialise() {
    //window.addEventListener('keydown', onKeyDown);
    canvas = document.getElementsByClassName('canvas')[0], ctx = canvas.getContext('2d');
    playerscore = document.getElementById('playerscore')
    oppoentscore = document.getElementById('oppoentscore')
    window.addEventListener("resize", resize);
    resize();
    render();
}

function render() {


    if (keysPressed['a']) {
        playerspeed = -10;
    }
    else if (keysPressed['z']) {
        playerspeed = 10;
    }
    else {
        playerspeed = 0;
    }
    if (keysPressed['\'']) {
        oppoentspeed = -10;
    }
    else if (keysPressed['/']) {
        oppoentspeed = 10;
    }
    else {
        oppoentspeed = 0;
    }
    if (playerY <= 0) { playerY = 0; }
    if (playerY >= height - 100) { playerY = height - 100; }
    if (oppoentY <= 0) { oppoentY = 0; }
    if (oppoentY >= height - 100) { oppoentY = height - 100; }
    if (centerY < ballRadius) { angle = -angle; }
    if (centerY > height - ballRadius) { angle = -angle; }

    playerY = playerY + playerspeed;
    oppoentY = oppoentY + oppoentspeed;

    centerX += speed * direction;
    centerY += speed * angle;

    if (direction === 1) {
        if ((centerX > width - 140) && (centerX < width - 120)){
            //check for hit.
            if ((centerY > oppoentY) && (centerY < oppoentY + 100)) {
                direction = -1;
                speed++;
                angle = angle + ((oppoentY - centerY - 50) * 0.001);
               
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
                angle = angle + ((oppoentY - centerY - 50) * 0.001);
                if (speed > maxSpeed) {
                    speed = maxSpeed;
                }
            }
        }
        else if (centerX < -40) {
            oppoentScored();
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();

    //Player
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(100, playerY, 20, 100);

    //Opponent
    ctx.fillStyle = '#FFFFF';
    ctx.fillRect(width - 120, oppoentY, 20, 100);

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
    oppoentScore=0;
    oppoentscore.innerHTML = oppoentScore;
    startPoint();
}

function playerScored() {
    console.log("Player Scored");
    playerScore++;
    playerscore.innerHTML = playerScore;
    startPoint();
}

function oppoentScored() {
    console.log("Oppoent Scored");
    oppoentScore++;
    oppoentscore.innerHTML = oppoentScore;
    startPoint();
}

function startPoint() {
    centerX = width / 2;
    centerY = height / 2;
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

    console.log("Width:" + width + " Height:" + height);
}