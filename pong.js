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
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vect();
    }
}

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
const ball = new Ball();
ball.pos.x = 100;
ball.pos.y = 50;
ball.vel.x = 100;
ball.vel.y = 100;

let lastTime;
const callback = ms => {
    if (lastTime) {
        update((ms = lastTime)/1000);
    }
    lastTime = ms;
    requestAnimationFrame(callback);
};

const update = changeTime => {
    ball.pos.x += ball.vel.x * changeTime;
    ball.pos.y += ball.vel.y * changeTime;

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#fff";
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
};

callback();