/**
 * Represents the status bar for coins in the game.
 * Extends the functionalities of the DrawableObject class.
 */
class CoinsStatusbar extends DrawableObject {

    IMAGES_COIN_BAR = ['img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'];

    coin = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.width = 200;
        this.height = 60;
        this.setCoinValue(0);
    }

    /**
     * Sets the value for the coin and updates the image accordingly on the coin status bar.
     * @param {number} coin - The value of the coin to set.
     */
    setCoinValue(coinStock) {
        let path = this.IMAGES_COIN_BAR[this.resolveImageIndex(coinStock)];
        this.x = 30;
        this.y = 50;
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the coin value for the coin status bar.
     * @returns {number} - The index of the image corresponding to the coin value.
     */
    resolveImageIndex(coinStock) {
        if (coinStock === 6) {
            return 6;
        } else if (coinStock === 5) {
            return 5;
        } else if (coinStock === 4) {
            return 4;
        } else if (coinStock === 3) {
            return 3;
        } else if (coinStock === 2) {
            return 2;
        } else if (coinStock === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}



