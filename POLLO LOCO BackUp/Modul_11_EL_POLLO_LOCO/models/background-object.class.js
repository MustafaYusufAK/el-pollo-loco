/**
 * Represents a background object in the game, inheriting from MovableObject.
 * BackgroundObject extends the functionalities of MovableObject for background elements.
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;

    }
}