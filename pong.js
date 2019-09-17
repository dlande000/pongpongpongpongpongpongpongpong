class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(w, h) {
        this.pos = new Vector();
        this.size = new Vector(w, h);
    }
    get left() {
        return (this.pos.x - this.size.x/2);
    } 
    get right() {
        return (this.pos.x + this.size.x/2);
    }
    get top() {
        return (this.pos.y - this.size.y/2);
    }
    get bottom() {
        return (this.pos.y + this.size.y/2);
    }
}

class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vector();
    }
}

class Player extends Rectangle {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this.colors = ["#FF355E", "#FF6037", "#FFFF66", '#FFCC33', '#66FF66', '#AAF0D1', '#50BFE6', '#FF6EFF', '#FF00CC', "#fff"];
        this.balls = [new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball()];
        this.players = [new Player(), new Player()];
        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height/2;
        });
        let lastTime;
        const requestAnimationFrameCallback = milliseconds => {
            if (lastTime) {
                this.update((milliseconds - lastTime)/1000);
            }
            lastTime = milliseconds;
            requestAnimationFrame(requestAnimationFrameCallback);
        };
        requestAnimationFrameCallback();
        this.resetAllBalls();
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
            ball.velocity.x = -1 * ball.velocity.x;
            const ballToChange = this.balls[this.balls.indexOf(ball)];
            ballToChange.velocity.y *= 1.02;
            ballToChange.velocity.x *= 1.02;
        }
    }

    draw() {
        this._context.fillStyle = 'rgba(0, 0, 0, 0.07)';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.balls.forEach((ball, i) => this.drawRect(ball, this.colors[i]));
        this.players.forEach(player => this.drawRect(player, "#fff"));
    }

    drawRect(rect, color) {
        this._context.fillStyle = color;
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    resetAllBalls() {
        this.balls.forEach(ball => {
            ball.pos.x = this._canvas.width/2;
            ball.pos.y = this._canvas.height/2;
            ball.velocity.x = 0;
            ball.velocity.y = 0;
        });
    }

    returnRandomSpeed() {
        return Math.round((((Math.random() * 200) + 50)) * (Math.random() > 0.5 ? 1 : -1));
    }

    resetOneBall(ball) {
        const i = this.balls.indexOf(ball);
        this.balls[i].pos.x = this._canvas.width/2;
        this.balls[i].pos.y = this._canvas.height/2;
        this.balls[i].velocity.x = this.returnRandomSpeed();
        this.balls[i].velocity.y = this.returnRandomSpeed();
    }

    start() {
        this.players.forEach(player => player.score = 0);
        this.balls.forEach(ball => {
            if (ball.velocity.x === 0) {
                ball.velocity.x = this.returnRandomSpeed();
                ball.velocity.y = this.returnRandomSpeed();
            }
        });
    }

    updateScore() {
        document.getElementById('p1_score').innerText = this.players[0].score;
        document.getElementById('p2_score').innerText = this.players[1].score;
    }

    changeAIPos(ball) {
        this.players[1].pos.y = (this.players[1].pos.y + ball.pos.y)/2;
    }

    update(changeTime) {
        let closestBall = this.balls[0];
        this.balls.forEach(ball => {
            if ((ball.pos.x > closestBall.pos.x && ball.velocity.x < closestBall.velocity.x) || ball.velocity.x > 200 ) {
                closestBall = ball;
            }

            ball.pos.x += ball.velocity.x * changeTime;
            ball.pos.y += ball.velocity.y * changeTime;

            if (ball.left < 0 || ball.right > this._canvas.width) {
                const playerId = ball.velocity.x < 0 | 0;
                this.players[playerId].score++;
                this.resetOneBall(ball);
            }
            if (ball.top < 0 || ball.bottom > this._canvas.height) {
                ball.velocity.y = -1 * ball.velocity.y;
            }
            this.players.forEach(player => {
                this.collide(player, ball);
                if (player.score > 49) {
                    this.resetAllBalls();
                }
            });
        });
        this.updateScore();
        this.changeAIPos(closestBall);
        this.draw();
    }
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].pos.y = event.offsetY;
});

canvas.addEventListener('click', event => {
    pong.start();
});