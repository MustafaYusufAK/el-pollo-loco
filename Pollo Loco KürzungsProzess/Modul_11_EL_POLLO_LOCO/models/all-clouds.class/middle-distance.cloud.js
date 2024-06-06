/**
 * Represents a cloud in the middle distance of the game, inheriting from MovableObject.
 * MiddleDistanceCloud extends the functionalities of MovableObject for clouds in the mid-distance.
 */
class MiddleDistanceCloud extends MovableObject {

    y;
    height;
    width;
    speed = 0.55;
    millisecond = 1000;
    x;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 60;
        this.height = 175;
        this.width = 300;
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
     * Moves the object to the left based on the given speed and time interval.
     * @param {number} milliseconds - The time interval in milliseconds for the movement.
     * @param {number} speed - The speed at which the object moves.
     */
    moveLeft(milliseconds, speed) {
        setInterval(() => {
            this.x -= speed;
        }, milliseconds);
    }

}