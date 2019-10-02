import Rectangle from './rectangle';

class Player extends Rectangle {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

export default Player;