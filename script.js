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
    let dy = Math.floor(height * 0.1);

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
    let dy = Math.floor(height * 0.1);

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
    let dx = Math.floor(width * 0.1);
    let dy = Math.floor(height * 0.1);

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

    if(ball.x+ball.width>=gameCanvas.width || ball.x<=0){
        ball.dx = -ball.dx;
    }
}


function gameLoop(gameCanvas, canvasContext, leftRocket, rightRocket, ball) {
    clearGameCanvas(gameCanvas, canvasContext);

    moveBall(ball, gameCanvas);
    //todo collision ball with rocket
    //todo collision ball with left right walls
    //todo print score

    drawGameItems(canvasContext, leftRocket, rightRocket, ball);

    requestAnimationFrame(function () {
        gameLoop(gameCanvas, canvasContext, leftRocket, rightRocket, ball)
    });
}

const gameCanvas = document.getElementById("gameCanvas");
const canvasContext = gameCanvas.getContext("2d");

setCanvasSize(gameCanvas);

const leftRocket = createLeftRocket(gameCanvas);
const rightRocket = createRightRocket(gameCanvas);
const ball = createBall(gameCanvas);

document.addEventListener("keydown", function (e) {
    if (e.code === "KeyW" || e.code === "KeyS") {
        moveLeftRocket(e.code, leftRocket, gameCanvas);
    } else if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        moveRightRocket(e.code, rightRocket, gameCanvas);
    }
});

gameLoop(gameCanvas, canvasContext, leftRocket, rightRocket, ball);

