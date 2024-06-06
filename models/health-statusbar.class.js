/**
 * Represents a health status bar that extends a drawable object.
 * @class
 * @extends DrawableObject
 */
class HealthStatusbar extends DrawableObject {

    IMAGES_HEALTH_BAR = ['img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png']; // 5

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.width = 200;
        this.height = 60;
        this.setPercentageHealthBar(100);
    }

    /**
     * Sets the percentage of the health bar and updates its display.
     * @param {number} percentage - The percentage value to set for the health bar.
     */
    setPercentageHealthBar(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.x = 30;
        this.y = 0;
        this.img = this.imageCache[path];
    }

    /**
     * Sets the percentage of the health bar based on a health item and updates its display.
     * @param {number} percentage - The percentage value obtained from a health item.
     */
    setPercentageByHealthItem(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.x = 30;
        this.y = 0;
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of an image based on the percentage value.
     * @returns {number} - The index of the image corresponding to the percentage value.
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
}