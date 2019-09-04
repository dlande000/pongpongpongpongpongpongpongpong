class Vect {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Rect {
    constructor(w, h) {
        this.pos = new Vect();
        this.size = new Vect(w, h);
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

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vect();
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this.balls = [new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball(), new Ball()];
        this.players = [new Player(), new Player()];
        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height/2;
        });
        let lastTime;
        const callback = ms => {
            if (lastTime) {
                this.update((ms = lastTime)/1000);
            }
            lastTime = ms;
            requestAnimationFrame(callback);
        };
        callback();
        this.resetAllBalls();
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
            ball.vel.x = -1 * ball.vel.x;
            // this.ball.vel.y *= 1.02;
            // this.ball.vel.x *= 1.02;
        }
    }

    draw() {
        this._context.fillStyle = "#000";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.balls.forEach(ball => this.drawRect(ball));
        this.players.forEach(player => this.drawRect(player));
    }

    drawRect(rect) {
        this._context.fillStyle = "#fff";
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    resetAllBalls() {
        this.balls.forEach(ball => {
            ball.pos.x = this._canvas.width/2;
            ball.pos.y = this._canvas.height/2;
            ball.vel.x = 0;
            ball.vel.y = 0;
        });
    }

    resetOneBall(ball) {
        const i = this.balls.indexOf(ball);
        this.balls[i].pos.x = this._canvas.width/2;
        this.balls[i].pos.y = this._canvas.height/2;
        this.balls[i].vel.x = ((Math.random() * (400)) - 1) * (Math.random() > 0.5 ? 1 : -1);
        this.balls[i].vel.y = ((Math.random() * (400)) - 1) * (Math.random() > 0.5 ? 1 : -1);
    }

    start() {
        this.balls.forEach(ball => {
            if (ball.vel.x === 0 || ball.vel.y === 0) {
                ball.vel.x = ((Math.random() * (400)) - 1) * (Math.random() > 0.5 ? 1 : -1);
                ball.vel.y = ((Math.random() * (400)) - 1) * (Math.random() > 0.5 ? 1 : -1);
            }
        });
    }

    update(changeTime) {
        this.balls.forEach(ball => {
            ball.pos.x += ball.vel.x * changeTime;
            ball.pos.y += ball.vel.y * changeTime;

            if (ball.left < 0 || ball.right > this._canvas.width) {
                const playerId = ball.vel.x < 0 | 0;
                this.players[playerId].score++;
                this.resetOneBall(ball);
            }
            if (ball.top < 0 || ball.bottom > this._canvas.height) {
                ball.vel.y = -1 * ball.vel.y;
            }
            this.players.forEach(player => {
                this.collide(player, ball);
                if (player.score > 20) {
                    this.resetAllBalls();
                }
            });
        });
        this.players[1].pos.y = this.balls[0].pos.y;
        this.draw();
    }
}

class Player extends Rect {
    constructor() {
        super(20, 100);
        this.score = 0;
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