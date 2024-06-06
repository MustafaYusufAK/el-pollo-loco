/**
 * Represents a chicken entity in the game, extending the MovableObject class.
 * Handles specific behaviors and attributes for the chicken entity.
 */
class Chicken extends MovableObject {

    dead = false;
    deadStartTime = 0;
    canCollide = true;
    height = 80;
    width = 100;
    y = 345;

    offset = { top: -10, left: +10, right: +10, bottom: +10 };

    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 1250;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.25;
        //this.chicken_walking.play();
        this.animate();

    }

    /**
     * Initiates the animation for the chicken entity, handling its movements and state changes.
     * If the chicken is not dead, it moves left and plays the walking animation. 
     * If dead, it stops the walking animation and plays the dead animation.
     */
    animate() {
        const walkingInterval = setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingInterval); // Stops the walking animation
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 5);
    }
}