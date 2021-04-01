'use strict';

(function () {

    const canvas = document.getElementsByClassName('canvas')[0],
        c = canvas.getContext('2d');
    var x = 0;

    function render() {
        c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        c.beginPath();

        // Adjust path based on x position
        c.moveTo(x, 50);
        c.quadraticCurveTo(x, 0, x + 50, 0);
        c.quadraticCurveTo(x + 100, 0, x + 100, 50);
        c.quadraticCurveTo(x + 100, 100, x + 50, 100);
        c.quadraticCurveTo(x, 100, x, 50);
        c.stroke();

        // Doing this for animation
        x += 5;
        if (x > canvas.width) {
            x = -100;
        }
        requestAnimationFrame(render);
    }
    render();
})();