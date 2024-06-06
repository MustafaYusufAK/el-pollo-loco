/**
 * Represents a Bottle object, extending the functionality of DrawableObject.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {

    x;
    y;
    isVisible = true;
    timeThrown = 0;

    width = 100;
    height = 100;

    offset = { top: + 55, left: + 60, right: + 45, bottom: + 55 };

    BOTTLE_IMAGE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = (-900 * Math.random()) + 150;
        this.y = 335
        this.height;
        this.width;
        this.loadImages(this.BOTTLE_IMAGE);
        this.animate();
    }

    /**
     * Initiates the animation for the Bottle object by playing its images at a specific interval.
     * @override
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGE); // Call the method from the superclass
        }, 1000 / 2);
    }

    /**
     * Plays an animation sequence for the object using the provided array of images.
     * If not already present in the superclass (DrawableObject), defines the method to animate images.
     * @param {Array} images - The array of image paths for the animation sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}