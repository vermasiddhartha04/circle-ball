document.addEventListener("DOMContentLoaded", function () {
    const circle = document.querySelector('.circle');
    const radius = circle.offsetWidth / 2;
    const balls = [];
    const speed = 2; // Adjust speed for natural movement
    let ballCount = 1;
    const colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
    let colorIndex = 0;
    const maxBalls = 50; // Maximum number of balls allowed

    function createBall(x, y) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
        ball.style.backgroundColor = colors[colorIndex];
        circle.appendChild(ball);
        balls.push({ element: ball, dx: (Math.random() - 0.5) * speed, dy: (Math.random() - 0.5) * speed });
        colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors
    }

    function moveBalls() {
        if (balls.length >= maxBalls) {
            // Stop creating new balls when maximum is reached
            return;
        }
        balls.forEach((ballData) => {
            const ball = ballData.element;
            let x = parseFloat(ball.style.left);
            let y = parseFloat(ball.style.top);

            x += ballData.dx;
            y += ballData.dy;

            // Check collision with circle boundary
            const distFromCenter = Math.sqrt(Math.pow(x + 10 - radius, 2) + Math.pow(y + 10 - radius, 2));
            if (distFromCenter + 10 >= radius) {
                // Ball hit the boundary, reverse direction and multiply
                ballData.dx = -ballData.dx;
                ballData.dy = -ballData.dy;

                for (let i = 0; i < ballCount && balls.length < maxBalls; i++) {
                    createBall(x, y);
                }
                ballCount *= 2;

                if (balls.length >= maxBalls) {
                    // Stop creating new balls when maximum is reached
                    return;
                }
            }

            ball.style.left = `${x}px`;
            ball.style.top = `${y}px`;
        });
    }

    // Create initial ball
    createBall(90, 90);

    // Move balls every 20ms
    setInterval(moveBalls, 20);
});
