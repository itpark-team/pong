function createScore() {
    return {
        playerLeftScore: 0,
        playerRightScore: 0
    }
}

function setCanvasSize(gameCanvas) {
    let calcW = Math.floor(window.innerWidth * 0.9);
    let calcH = Math.floor(window.innerHeight * 0.8);

    gameCanvas.width = calcW;
    gameCanvas.height = calcH;
}

function createLeftRocket(gameCanvas) {
    let height = Math.floor(gameCanvas.height * 0.2);
    let width = Math.floor(gameCanvas.width * 0.02);
    let x = 10;
    let y = Math.floor(gameCanvas.height / 2 - height / 2);
    let dy = Math.floor(height * 0.15);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dy: dy,
        color: "white"
    }
}

function createRightRocket(gameCanvas) {
    let height = Math.floor(gameCanvas.height * 0.2);
    let width = Math.floor(gameCanvas.width * 0.02);
    let x = gameCanvas.width - width - 10;
    let y = Math.floor(gameCanvas.height / 2 - height / 2);
    let dy = Math.floor(height * 0.15);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dy: dy,
        color: "black"
    }
}

function createBall(gameCanvas) {
    let height = Math.floor(gameCanvas.height * 0.05);
    let width = height;
    let x = Math.floor(gameCanvas.width / 2 - width / 2);
    let y = Math.floor(gameCanvas.height / 2 - height / 2);
    let dx = Math.floor(width * 0.3);
    let dy = Math.floor(height * 0.3);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        color: "burlywood"
    }
}

function clearGameCanvas(gameCanvas, canvasContext) {
    canvasContext.beginPath();
    canvasContext.rect(0, 0, gameCanvas.width, gameCanvas.height);
    canvasContext.fillStyle = "green";
    canvasContext.fill();
    canvasContext.closePath();
}

function drawGameItems(canvasContext, leftRocket, rightRocket, ball) {
    canvasContext.beginPath();
    canvasContext.rect(ball.x, ball.y, ball.width, ball.height);
    canvasContext.fillStyle = ball.color;
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.rect(leftRocket.x, leftRocket.y, leftRocket.width, leftRocket.height);
    canvasContext.fillStyle = leftRocket.color;
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.rect(rightRocket.x, rightRocket.y, rightRocket.width, rightRocket.height);
    canvasContext.fillStyle = rightRocket.color;
    canvasContext.fill();
    canvasContext.closePath();
}

function moveLeftRocket(key, leftRocket, gameCanvas) {
    if (key === "KeyW" && leftRocket.y > 0) {
        leftRocket.y -= leftRocket.dy;
        if (leftRocket.y < 0) {
            leftRocket.y = 0;
        }
    } else if (key === "KeyS" && leftRocket.y + leftRocket.height < gameCanvas.height) {
        leftRocket.y += leftRocket.dy;
        if (leftRocket.y + leftRocket.height > gameCanvas.height) {
            leftRocket.y = gameCanvas.height - leftRocket.height;
        }
    }
}

function moveRightRocket(key, rightRocket, gameCanvas) {
    if (key === "ArrowUp" && rightRocket.y > 0) {
        rightRocket.y -= rightRocket.dy;
        if (rightRocket.y < 0) {
            rightRocket.y = 0;
        }
    } else if (key === "ArrowDown" && rightRocket.y + rightRocket.height < gameCanvas.height) {
        rightRocket.y += rightRocket.dy;
        if (rightRocket.y + rightRocket.height > gameCanvas.height) {
            rightRocket.y = gameCanvas.height - rightRocket.height;
        }
    }
}

function moveBall(ball, gameCanvas) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.height >= gameCanvas.height || ball.y <= 0) {
        ball.dy = -ball.dy;
    }

    // if (ball.x + ball.width >= gameCanvas.width || ball.x <= 0) {
    //     ball.dx = -ball.dx;
    // }
}

function ballCollisionWithLeftRocket(ball, leftRocket) {
    if (ball.x <= leftRocket.x + leftRocket.width &&
        ball.y + ball.height >= leftRocket.y &&
        ball.y <= leftRocket.y + leftRocket.height) {
        ball.dx = -ball.dx;
        ball.x = leftRocket.x + leftRocket.width + 1;
    }
}

function ballCollisionWithRightRocket(ball, rightRocket) {
    if (ball.x + ball.width >= rightRocket.x &&
        ball.y + ball.height >= rightRocket.y &&
        ball.y <= rightRocket.y + rightRocket.height) {
        ball.dx = -ball.dx;
        ball.x = rightRocket.x - ball.width - 1;
    }
}

function drawScore(gameCanvas, canvasContext, score) {
    canvasContext.beginPath();
    canvasContext.fillStyle = "#FACE8D";
    let fontSize = Math.floor(gameCanvas.height * 0.05);
    canvasContext.font = `italic ${fontSize}pt Arial`;

    let margitTop = Math.floor(gameCanvas.height * 0.1);
    let marginLeft =  Math.floor(gameCanvas.width * 0.1);

    canvasContext.fillText(`Счёт игры ${score.playerLeftScore}:${score.playerRightScore}`, gameCanvas.width / 2 - marginLeft, margitTop);
    canvasContext.closePath();
}

function collisionBallWithLeftWall(ball, gameCanvas, score) {
    if (ball.x <= 0) {
        score.playerRightScore++;
        ball.x = Math.floor(gameCanvas.width / 2 - ball.width / 2);
        ball.y = Math.floor(gameCanvas.height / 2 - ball.height / 2);
        ball.dx = -ball.dx;
    }
}

function collisionBallWithRightWall(ball, gameCanvas, score) {
    if (ball.x + ball.width >= gameCanvas.width) {
        score.playerLeftScore++;
        ball.x = Math.floor(gameCanvas.width / 2 - ball.width / 2);
        ball.y = Math.floor(gameCanvas.height / 2 - ball.height / 2);
        ball.dx = -ball.dx;
    }
}

function whoWin(score) {
    if (score.playerLeftScore === 10) {
        return "Левый игрок";
    }
    if (score.playerRightScore === 10) {
        return "Правый игрок";
    }
    return "none";
}


function gameLoop(gameCanvas, canvasContext, leftRocket, rightRocket, ball, score) {
    clearGameCanvas(gameCanvas, canvasContext);

    moveBall(ball, gameCanvas);

    ballCollisionWithLeftRocket(ball, leftRocket);
    ballCollisionWithRightRocket(ball, rightRocket);

    collisionBallWithLeftWall(ball, gameCanvas, score);
    collisionBallWithRightWall(ball, gameCanvas, score);

    drawGameItems(canvasContext, leftRocket, rightRocket, ball);
    drawScore(gameCanvas, canvasContext, score);

    winner = whoWin(score);

    if (winner === "none") {
        requestAnimationFrame(function () {
            gameLoop(gameCanvas, canvasContext, leftRocket, rightRocket, ball, score)
        });
    } else {
        alert(`Победил ${winner}! Для перезапуска игры обновите страницу`);
    }
}

const gameCanvas = document.getElementById("gameCanvas");
const canvasContext = gameCanvas.getContext("2d");

setCanvasSize(gameCanvas);

const leftRocket = createLeftRocket(gameCanvas);
const rightRocket = createRightRocket(gameCanvas);
const ball = createBall(gameCanvas);
const score = createScore();

document.addEventListener("keydown", function (e) {
    if (e.code === "KeyW" || e.code === "KeyS") {
        moveLeftRocket(e.code, leftRocket, gameCanvas);
    } else if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        moveRightRocket(e.code, rightRocket, gameCanvas);
    }
});

gameLoop(gameCanvas, canvasContext, leftRocket, rightRocket, ball, score);

