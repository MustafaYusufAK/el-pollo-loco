/**
 * Represents the health bar for the end boss and extends a drawable object.
 * @class
 * @extends DrawableObject
 */
class EndbossHealthBar extends DrawableObject {
    percentage = 100;
    isVisible = false;

    ENDBOSS_HEALTHBAR = ['img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'];

    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
        this.loadImages(this.ENDBOSS_HEALTHBAR);
        this.width = 200;
        this.height = 60;
        this.x = 490;
        this.y = 40;
        this.setPercentageHealthBar(this.percentage);
    }

    /**
     * Sets the percentage value for the end boss's health bar and updates its image accordingly.
     * @function setPercentageHealthBar
     * @param {number} percentage - The percentage value for the health bar.
     * @memberof EndbossHealthBar
     */
    setPercentageHealthBar(percentage) {
        this.percentage = percentage;
        let path = this.ENDBOSS_HEALTHBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the percentage value to determine the appropriate health bar image.
     * @function resolveImageIndex
     * @returns {number} - The index of the health bar image based on the percentage value.
     * @memberof EndbossHealthBar
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * Handles a hit to the boss, reducing its health and checking for victory conditions.
     */
    hit() {
        if (this.whenAHitComesTooQuickly())
            return;
        this.percentage -= 20;
        if (this.endbossDead()) {
            setTimeout(() => this.gameWon(), 1000);
            setTimeout(() => this.percentage = 100, 500);
        } else
            this.lastHit = new Date().getTime();
        this.setPercentageHealthBar(this.percentage);
    }

    /**
     * Checks if hits come too quickly, preventing rapid health reduction.
     * @returns {boolean} - True if hits come too quickly, otherwise false.
     */
    whenAHitComesTooQuickly() {
        return this.lastHit && (new Date().getTime() - this.lastHit) < 1000;
    }

    /**
     * Checks if the end boss is dead based on its health percentage.
     * @returns {boolean} - True if the end boss is dead (health is 0), otherwise false.
     */
    endbossDead() {
        return this.percentage == 0;
    }

    /**
     * Handles the game-winning scenario.
     */
    gameWon() {
        world.win = true;
        world.currentScreen = "end";
    }
}