/**
 * Represents a cloud object that can be moved across the screen.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {

    y;
    height;
    width;
    speed = 0.75;
    millisecond = 1000;
    x;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 20;
        this.height = 250;
        this.width = 500;
        this.animateMoveCloud();
        this.x = -2276 + (this.randomNumber() * 400);
    }

    /**
     * Initiates the leftward movement animation of the cloud object based on provided millisecond and speed parameters.
     */
    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

    /**
     * Initiates leftward movement of the object based on the provided time interval and speed.
     * @param {number} milliseconds - The time interval for the movement.
     * @param {number} speed - The speed of the movement.
     */
    moveLeft(milliseconds, speed) {
        setInterval(() => {
            this.x -= speed;
        }, milliseconds);
    }
}