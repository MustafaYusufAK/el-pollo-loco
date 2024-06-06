/**
 * Represents a cloud object that moves in the far distance.
 * Extends the MovableObject class.
 */
class FarDistanceCloud extends MovableObject {

    y;
    height;
    width;
    speed = 0.2;
    millisecond = 1000;
    x;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.y = 50;
        this.height = 100;
        this.width = 250;
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
     * Moves the object towards the left based on the provided time interval and speed.
     * @param {number} milliseconds - The time interval for the movement.
     * @param {number} speed - The speed at which the object moves leftwards.
     */
    moveLeft(milliseconds, speed) {
        setInterval(() => {
            this.x -= speed;
        }, milliseconds);
    }

}