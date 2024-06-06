/**
 * Represents health items and extends a drawable object.
 * @class
 * @extends DrawableObject
 */
class HealthItems extends DrawableObject {

    height = 60;
    width = 80;
    // y = 345;

    offset = { top: +5, left: +25, right: +25, bottom: +100 };

    IMAGES_HEALTH = ['img/7_statusbars/3_icons/icon_health.png',
        'img/7_statusbars/3_icons/icon_health_2.png'];


    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.x = 100 + Math.random() * 1500;
        this.y = 345 + Math.random() * - 300;
        this.loadImages(this.IMAGES_HEALTH);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Initiates the animation cycle for health items.
     * @function animate
     * @memberof HealthItems
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_HEALTH); // Calls the method from the superclass
        }, 1000 / 2);
    }

    /**
     * Plays an animation by cycling through the provided images.
     * @function playAnimation
     * @param {Array} images - The array of image paths to animate.
     * @memberof HealthItems
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}