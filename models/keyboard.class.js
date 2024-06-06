/**
 * Represents a keyboard object with boolean states for various keys.
 * @class
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    D = false;
    ESC = false;

    /**
     * Constructor for the Keyboard class.
     * Initializes keyboard events and binds touch events to buttons.
     * @constructor
     */
    constructor() {
        this.keysPressTrue();
        this.keysPressFalse();
        this.bindBtsPressStartEvents();
        this.bindBtsPressEndEvents();
    }

    /**
     * Event listener for key presses.
     * Sets the corresponding keyboard status to 'true'.
     */
    keysPressTrue() {
        window.addEventListener('keydown', (e) => {
            if (!world.gamePaused) {
                const keyMap = {
                    37: 'LEFT',
                    39: 'RIGHT',
                    40: 'DOWN',
                    38: 'UP',
                    68: 'D',
                    27: 'ESC'
                };
                this[keyMap[e.keyCode]] = true;
            }
        });
    }

    /**
     * Event listener for key releases.
     * Sets the corresponding keyboard status to 'false'.
     */
    keysPressFalse() {
        window.addEventListener('keyup', (e) => {
            if (!world.gamePaused) {
                const keyMap = {
                    37: 'LEFT',
                    39: 'RIGHT',
                    40: 'DOWN',
                    38: 'UP',
                    68: 'D',
                    27: 'ESC'
                };
                this[keyMap[e.keyCode]] = false;
            }
        });
    }

    /**
    * Binds touch Start events to buttons.
    */
    bindBtsPressStartEvents() {
        document.getElementById('throw-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.D = true; });
        document.getElementById('jump-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.UP = true; });
        document.getElementById('right-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.RIGHT = true; });
        document.getElementById('left-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.LEFT = true; });
    }
    /**
     * Binds touchend events to buttons.
     */
    bindBtsPressEndEvents() {
        document.getElementById('throw-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.D = false; });
        document.getElementById('jump-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.UP = false; });
        document.getElementById('right-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.RIGHT = false; });
        document.getElementById('left-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.LEFT = false; });
    }
}