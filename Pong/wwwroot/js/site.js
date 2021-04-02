'use strict';
var canvas;
var ctx;
var x = 0;

var centerX = 600;
var centerY = 600;
var speed = 1;

var playery = 300;
var oppoenty = 300;

var playerspeed = 0;



window.onload = function(){
    initialise();
}

function initialise() {
    window.addEventListener('keydown', onKeyDown);
    canvas = document.getElementsByClassName('canvas')[0],ctx = canvas.getContext('2d');
    window.addEventListener("resize", resize);
    resize();
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();

    playery = playery + playerspeed;


    if (playery <= 0) {
        playery = 0;
    }

    if (playery >= 1000) {
        playery = 1000;
    }



    //Player
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(100, playery, 20, 100);

    //Opponent
    ctx.fillStyle = '#FFFFF';
    ctx.fillRect(500, oppoenty, 20, 100);

    //Ball
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFFFF';
    ctx.stroke();

    // Doing this for animation
    centerX += speed;
    if (centerX > canvas.width) {
        centerX = -100;
        speed++;
    }

    requestAnimationFrame(render);
}

function resize() {

    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
    console.log(keyCode);
    //event.preventDefault();

    if (keyCode === 65) {
        playerspeed--;
        //if (playery <= 0) {
        //    playery = 0;
        //}
    }

    if (keyCode === 90) {
        playerspeed++;
        //if (playery >= 1000) {
        //    playery = 1000;
        //}
    }






    //left a=65 z=90

    //right "=222 /=191
};