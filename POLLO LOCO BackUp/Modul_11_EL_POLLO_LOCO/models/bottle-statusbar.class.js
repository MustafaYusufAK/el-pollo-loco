/**
 * Represents a status bar for the bottle count in the game.
 * Extends the functionality of the DrawableObject class.
 */
class BottleStatusbar extends DrawableObject {

    IMAGES_BOTTLE_BAR = ['img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'];

    bottle = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.width = 200;
        this.height = 60;
        this.setBottleValue(0);
    }

    /**
     * Sets the value of the bottle stock and updates the image accordingly.
     * @param {number} bottleStock - The current number of bottles in stock.
     */
    setBottleValue(bottleStock) {
        let path = this.IMAGES_BOTTLE_BAR[this.resolveImageIndex(bottleStock)];
        this.x = 30;
        this.y = 100;
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current bottle stock.
     * @param {number} bottleStock - The current number of bottles in stock.
     * @returns {number} - The index of the image corresponding to the bottle stock.
     */
    resolveImageIndex(bottleStock) {
        if (bottleStock === 6) {
            return 6;
        } else if (bottleStock === 5) {
            return 5;
        } else if (bottleStock === 4) {
            return 4;
        } else if (bottleStock === 3) {
            return 3;
        } else if (bottleStock === 2) {
            return 2;
        } else if (bottleStock === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
