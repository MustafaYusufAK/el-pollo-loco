/**
 * Represents the main character in the game, inheriting from MovableObject.
 * Handles the movements, actions, and states of the character within the game.
 */
class Character extends MovableObject {

    height = 285;
    width = 100;
    y = 45;
    x = -1900;
    speed = 5.5;
    lastMoveTime = 0;
    idleTimeout = 250;
    idleLongTimout = 8000;
    jump_sound = new Audio('audio/jump.mp3');
    sleep_sound = new Audio('audio/Cartoon_Snoring_SOUND_EFFECT.mp3');
    fallsAsleep = 0;

    offset = { top: 5, left: 5, right: 5, bottom: 5 };

    IMAGES_LONG_IDLE = ['img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',]

    IMAGES_IDLE = ['img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png']

    IMAGES_WALKING = ['img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'

    ];

    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-43.png']

    IMAGES_DEAD = ['img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'];

    world;
    walking_sound = new Audio('audio/walking.mp3');
    game_music = new Audio('audio/Game-Music.mp3');
    first_jump_sound = new Audio('audio/first_jump_sound.mp3');
    second_jump_sound = new Audio('audio/second_jump_sound.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates the character's jump by setting the vertical speed to 30.
     */
    character_jumps() {
        this.speedY = 30;
    }

    /**
 * Initiates the animations for movement and images.
 */
    animate() {
        this.animateMovement();
        this.animateImages();
        this.fallsAsleepSoon();
    }

    /**
     * Initiates the animation for movement.
     */
    animateMovement() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
    }

    /**
     * Increments the fallsAsleep property at regular intervals.
     */
    fallsAsleepSoon() {
        setInterval(() => {
            this.fallsAsleep += 1;
        }, 1000);
    }

    /**
     * Moves the character based on keyboard input and updates the camera position.
     */
    moveCharacter() {
        if (this.world.homeMenu) {
            this.number++;
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} - True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} - True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -2100;
    }

    /**
     * Moves the character to the left and sets the direction flag.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} - True if the character can jump, false otherwise.
     */
    canJump() {
        return world.keyboard.UP && !this.isAboveGround();
    }

    /**
     * Performs a jump action and plays the jump sound.
     */
    jump() {
        if (this.world.homeMenu) {
            this.character_jumps();
            if (!this.world.mute)
                this.jump_sound.play();
            this.walking_sound.pause();
        }

    }

    /**
     * Initiates the animation for images.
     */
    animateImages() {
        setInterval(() => this.playCharacter(), 100);
    }

    /**
     * Plays the appropriate animation based on the character's state.
     */
    playCharacter() {
        this.characterIdle();
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.fallsAsleep = 0;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.fallsAsleep = 0;
        } else if (this.isAboveGround()) {
            this.jumpAnimation();
            this.fallsAsleep = 0;
        } else {
            this.characterMoving();
        }
    }

    /**
     * Checks if the character is moving either to the right or left.
     * If true, plays the walking animation and resets the fallsAsleep property to 0.
     */
    characterMoving() {
        if (this.isJumping)
            this.isJumping = false;
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            if (!this.world.mute && this.world.homeMenu) {
                this.sleep_sound.play();
                this.walking_sound.play();
                this.fallsAsleep = 0;
            }
        }
    }

    /**
     * Initiates the jump animation, setting the jumping flag.
     */
    jumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.isJumping = true;
        this.fallsAsleep = 0;
    }

    /**
     * Manages the character's idle state based on the fallsAsleep property.
     * Plays either the idle animation or the sleep animation and sound.
     */
    characterIdle() {
        if (this.fallsAsleep < 5) {
            this.playAnimation(this.IMAGES_IDLE);
            this.sleep_sound.currentTime = 0;
            this.sleep_sound.pause();
            this.walking_sound.pause();
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!this.world.mute && this.world.homeMenu) {
                this.sleep_sound.play();
            }
        }
    }
}