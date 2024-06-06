/**
 * Represents an end boss and extends a movable object.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    height = 425;
    width = 250;
    y = 40
    speed = 20;
    bossHurt = false;
    bossWalking = false;
    animateInterval;

    offset = { top: + 10, left: + 10, right: + 10, bottom: + 10 };

    IMAGE_ENDBOSS_HEALTH_BAR = ['img/7_statusbars/2_statusbar_endboss/orange.png'];

    IMAGES_WALKING = ['img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'];

    IMAGES_ALERT = ['img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'];

    IMAGES_ATTACK = ['img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'];

    IMAGES_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'];

    IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2157; // Standardmäßig beträgt es 2157
        this.animate();
    }

    /**
 * Initiates the animation cycle for the end boss.
 * Starts intervals for the boss's movement and its reaction when hit.
 * @function animate
 * @memberof Endboss
 */
    animate() {
        this.animateInterval = setInterval(() => {
            this.bossMoving();
            this.bossWasHit();
        }, 200);
    }

    /**
 * Handles the animation of the end boss while moving.
 */
    bossMoving() {
        if (this.bossWalking) {
            if (!this.alertInterval) {
                this.alertInterval = setInterval(() => {
                    this.playAnimation(this.IMAGES_ALERT);
                }, 200);
                setTimeout(() => {
                    clearInterval(this.alertInterval);
                    this.alertInterval = null;
                }, 200);
            }
            this.moveLeft();
        }
    }

    /**
 * Handles the animation of the end boss when it is hit.
 * If the end boss is not hurt, it plays the walking animation; otherwise, it plays the hurt animation.
 */
    bossWasHit() {
        if (!this.bossHurt) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_HURT);
            setTimeout(() => {
                this.bossHurt = false;
            }, 250);
        }
    }

    /**
 * Initiates the death animation of the end boss.
 * Clears the animation interval and plays the dead animation for a brief period.
 */
    animateDeath() {
        clearInterval(this.animateInterval);
        let deathInterval;
        deathInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
        setTimeout(() => {
            clearInterval(deathInterval);
        }, 500);
    }
}

