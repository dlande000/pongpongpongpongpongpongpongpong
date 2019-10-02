/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");



class Ball extends _rectangle__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super(10, 10);
        this.velocity = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Ball);

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pong__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pong */ "./src/pong.js");


const canvas = document.getElementById('pong');
const pong = new _pong__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].pos.y = event.offsetY;
});

canvas.addEventListener('click', event => {
    pong.start();
});

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle */ "./src/rectangle.js");


class Player extends _rectangle__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/pong.js":
/*!*********************!*\
  !*** ./src/pong.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ "./src/ball.js");



class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this.colors = ["#FF355E", "#FF6037", "#FFFF66", '#FFCC33', '#66FF66', '#AAF0D1', '#50BFE6', '#FF6EFF', '#FF00CC', "#fff"];
        this.balls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"]()];
        this.players = [new _player__WEBPACK_IMPORTED_MODULE_0__["default"](), new _player__WEBPACK_IMPORTED_MODULE_0__["default"]()];
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
        this._context.fillStyle = 'rgba(0, 0, 0, 0.06)';
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
        return ((Math.random() * 200) + 50) * (Math.random() > 0.5 ? 1 : -1);
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
        let chasingBall = this.balls[0];
        this.balls.forEach(ball => {
            if ((ball.velocity.x > 220 && ball.velocity.x < 350) || (ball.pos.x > chasingBall.pos.x && ball.velocity.x < chasingBall.velocity.x)) {
                chasingBall = ball;
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
        this.changeAIPos(chasingBall);
        this.draw();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Pong);

/***/ }),

/***/ "./src/rectangle.js":
/*!**************************!*\
  !*** ./src/rectangle.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");


class Rectangle {
    constructor(w, h) {
        this.pos = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.size = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, h);
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

/* harmony default export */ __webpack_exports__["default"] = (Rectangle);

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Vector);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map