/**
 * Represents movable objects of type "Chicks."
 * Inherits characteristics and behaviors from the MovableObject class.
 */
class Chicks extends MovableObject {

    dead = false;
    height = 40;
    width = 50;
    y = 385;
    speedY = 25;
    acceleration = 2.5;
    isJumping = false;

    offset = { top: -10, left: +5, right: +15, bottom: -50 };

    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 250 + Math.random() * 1850;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.40 + Math.random() * 0.25;
        //this.chicken_walking.play();
        this.animate();
        this.letChicksJumpAndFall();
    }

    /**
     * Initiates animation for the chicks, providing walking or death animation based on their state.
     */
    animate() {
        const walkingInterval = setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingInterval); // Stop the walking animation
                this.chicksFall();
                this.chickFallsByDeath();
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 15);
    }


    /**
         * Initiates the jumping and falling behavior for the chicks.
         */
    letChicksJumpAndFall() {
        let jumpInterval = 200 + Math.random() * 500;
        let jumpHeight = 3 + Math.random() * 10;
        setInterval(() => {
            if (!this.dead) {
                this.chicksJumpAndFall(jumpInterval, jumpHeight);
            }

        }, 1000 / 25);
    }

    /**
     * Handles the jumping behavior of the chicks.
     */
    chicksJumping() {
        if (this.speedY >= 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.isJumping = false;
        }
    }

    /**
     * Handles the falling behavior of the chicks.
     */
    chicksFall() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
    }

    /**
     * Checks if the chicks are in the air.
     * @returns {boolean} - True if the chicks are in the air, false otherwise.
     */
    chicksInAir() {
        return this.y < 385;
    }

    /**
     * Combines the jumping and falling behavior of the chicks.
     * @param {number} jumpInterval - The interval between jumps.
     * @param {number} jumpHeight - The height of each jump.
     */
    chicksJumpAndFall(jumpInterval, jumpHeight) {
        if (this.isJumping) {
            this.chicksJumping();
        } else {
            if (this.chicksInAir()) {
                this.chicksFall();
            } else {
                this.y = 385;
                this.speedY = 0;
                setTimeout(() => {
                    this.isJumping = true;
                    this.speedY = jumpHeight;
                }, jumpInterval);
            }
        }
    }

    /**
     * Positions the chick to fall down as part of the death animation.
     * Resets its vertical position and stops its vertical movement.
     */
    chickFallsByDeath() {
        this.y = 385;
        this.speedY = 0;
    }
}