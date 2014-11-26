/* app.js -- our main application code */
document.addEventListener('DOMContentLoaded', function() {
    //we will add code here to draw things on the canvas

    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    var i;
/*
    ctx.fillStyle = '#FF0000';
    ctx.strokeStyle = '#000000';
    ctx.rect(10,10,100,100);
    ctx.fillRect(10, 10, 100, 100);
    ctx.stroke();
*/

    // generate a random number
    function randomInt(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    }

    // Creates a ball with a random context
    function createBall() {
        var radius = randomInt(10,20);

        return {
            left: randomInt(0, canvas.width),
            top: randomInt(0, canvas.height),
            width: radius,
            height: radius,
            fillStyle: randomColor(),
            xVelocity: randomInt(2, 6),
            yVelocity: randomInt(2, 6),
            acc: true
        };
    }

    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }


    // Draw the ball
    function renderBall(ball, ctx) {
        ctx.fillStyle = ball.fillStyle;
        ctx.beginPath();
        ctx.arc(ball.left + (ball.width / 2), ball.top + (ball.height / 2), ball.width / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw our balls!
    var balls = [];

    for (i = 0; i < 100; i++) {
        balls.push(createBall());
    }


    var ball = createBall();
    var timeInterval = 0;

    //Set our animation
    window.setInterval(function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (i = 0; i < balls.length; i++) {
            ball = balls[i];

            ball.left += ball.xVelocity;
            ball.top += ball.yVelocity;

            if (ball.left < 0) {
                ball.xVelocity = -ball.xVelocity;
                ball.left = 0;
            }

            if (ball.left + ball.width > canvas.width) {
                ball.xVelocity = -ball.xVelocity;
                ball.left = canvas.width - ball.width;
            }

            if (ball.top < 0) {
                ball.yVelocity = -ball.yVelocity;
                ball.top = 0;
            }

            if (ball.top + ball.height > canvas.height) {
                ball.yVelocity = -ball.yVelocity;
                ball.top = canvas.height - ball.height;
            }

            if (timeInterval % 100 == 20) {
                ball.fillStyle = randomColor();
            }

            renderBall(ball, ctx);
        }

        if (timeInterval > 1000) {
            canvas.setAttribute('width', canvas.width - 5);
            timeInterval= 0;
        } else {
            timeInterval = timeInterval + 20;
        }

    }, 20);


});