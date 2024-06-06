/**
 * Represents coins in the game, extending the properties and behaviors of a drawable object.
 * @class Coins
 * @extends DrawableObject
 */
class Coins extends DrawableObject {

    IMAGE_COIN_ANIMATION = ['img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'];

    offset = { top: + 62, left: + 62, right: + 62, bottom: + 62 };

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE_COIN_ANIMATION);
        this.height = 175;
        this.width = 175;
        this.x = 400 + Math.random() * 1000;
        this.animate(); // Fix the typo here
    }

    /**
     * Initiates animation for coins, invoking the superclass method for animation.
     * @function animate
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COIN_ANIMATION); // Calls the method from the superclass
        }, 1000 / 2);
    }

    /**
     * Plays an animation by cycling through the provided images.
     * @param {Array} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


}
