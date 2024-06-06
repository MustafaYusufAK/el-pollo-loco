/**
 * A class representing throwable objects, extending the MovableObject class.
 */
class ThrowableObject extends MovableObject {
    world;
    speedY = 30;
    speedX = 20;
    collisionBottle = false;
    threwBottle = false;
    hit = false;
    break = false;
    timeThrown = 0;

    /**
     * An object defining offset values for various directions.
     */
    offset = { top: + 40, left: + 40, right: + 20, bottom: + 40 };

    IMAGE_BOTTLE_ROTATION = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'];

    IMAGE_BOTTLE_SPLASH = ['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'];


    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 75;
        this.throw(direction);
    }

    /**
 * Throws the bottle and initiates animation.
 */
    throw(direction) {
        this.speedY = 30;
        this.applyGravity();
        let moveInterval = setInterval(() => {
            this.move(direction);
            if (this.break) {
                clearInterval(moveInterval);
            }
        }, 75);
        setInterval(this.rotate.bind(this), 100);
    }

    /**
     * Checks if the object's vertical position is above a specified ground level.
     * @returns {boolean} Returns true if the object's vertical position is above 345; otherwise, false.
     */
    isAboveGround() {
        return this.y < 345;
    }

    /**
     * Sets the 'speedY' property to 30.
     */
    speedY30 = () => {
        this.speedY = 30;
    };

    /**
     * Moves the bottle horizontally based on its direction and speed.
     */
    move(direction) {
        if (direction) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    }

    /**
     * Rotates the bottle, triggering different animations based on its state.
     */
    rotate() {
        if (this.break) {
            this.acceleration = 0;
            this.speedY = 0;
            this.speedX = 0;
            this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        } else {
            this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
        }
    }
}