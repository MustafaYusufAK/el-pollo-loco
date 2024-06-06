/**
 * A class representing a movable object, inheriting from the DrawableObject class.
 */
class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bar = 0
    lastHit = 0;
    lastHeal = 0;

    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    /**
     * Applies gravity to the object, adjusting its vertical position based on gravitational force.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if two objects are colliding based on their positions and dimensions.
     * @param {object} mo - The other object to check for collision.
     * @returns {boolean} Returns true if the objects are colliding; otherwise, false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Reduces the energy of the object when it is hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
            this.jumpToEndScreen();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces energy by 35 units due to a big hit.
     * Triggers the 'jumpToEndScreen' method if energy falls to or below zero, otherwise updates the last hit time.
     */
    bigHit() {
        this.energy -= 35;
        if (this.energy <= 0) {
            this.energy = 0;
            this.jumpToEndScreen();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Initiates a transition to the 'end' screen after a delay of 400 milliseconds.
     */
    jumpToEndScreen() {
        setTimeout(() => {
            this.world.currentScreen = "end";
        }, 400);
    }

    /**
     * Increases the object's energy by 20 units and ensures it does not exceed 100.
     */
    contactWithLifeItem() {
        this.energy += 20;
        if (this.energy >= 100) {
            this.energy = 100;
        } else {
            this.lastHeal = new Date().getTime();
        }
    }

    /**
     * Increases the value of the 'bar' property by 20 units and ensures it does not exceed 100.
     */
    gain() {
        this.bar += 20;
        if (this.bar >= 100) {
            this.bar = 100;
        }
    }

    /**
     * Decreases the value of the 'bar' property by 20 units and ensures it does not go below 0.
     */
    lose() {
        this.bar -= 20;
        if (this.bar <= 0) {
            this.bar = 0;
        }
    }

    /**
     * Checks if the object is hurt based on the time elapsed since the last hit.
     * @returns {boolean} Returns true if less than a second has passed since the last hit; otherwise, false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 1;
    }

    /**
     * Checks if the object is in a healing state based on the time elapsed since the last heal.
     * @returns {boolean} Returns true if less than a second has passed since the last heal; otherwise, false.
     */
    isHealing() {
        let timePassed = new Date().getTime() - this.lastHeal; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} Returns true if the energy level is zero; otherwise, false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the object is positioned above a certain vertical threshold.
     * @returns {boolean} Returns true if the vertical position is below 145; otherwise, false.
     */
    isAboveGround() {
        return this.y < 145;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation by cycling through the provided images.
     * @param {Array} images - The array of image paths to animate.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    randomNumber() {
        // Generiere eine zufällige Zahl zwischen 1 und 16
        return Math.floor(Math.random() * 16) + 1;
    }
}