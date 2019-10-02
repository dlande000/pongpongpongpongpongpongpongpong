import Vector from './vector';
import Rectangle from './rectangle';

class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vector();
    }
}

export default Ball;