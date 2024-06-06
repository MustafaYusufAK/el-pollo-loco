class World {
    soundArray = [];
    mute = true;
    gamePaused = true;
    win = false;
    character = new Character();
    endboss = level1.enemies.find(e => e instanceof Endboss);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    titleScreen;
    currentScreen = "title";
    homeMenu = false;
    menuShown = false;
    startButton = document.getElementById('start-button');
    menuButton = document.getElementById('menu');
    restartButton = document.getElementById('restart-button');
    fullScreenLogo = document.getElementById('full-size-logo');
    mobileControls = document.getElementById('mobile-controls');
    collect_coin = new Audio('audio/coin-pickup.mp3');
    game_sound = new Audio('audio/Game-Music.mp3');
    death_chicken = new Audio('audio/chicken_dead.mp3');
    death_chicks = new Audio('audio/chick_dead.mp3');
    game_over = new Audio('audio/Move_Forward.mp3');
    hurt = new Audio('audio/Minecraft_Steve_OOF_Sound_Effect.mp3');
    health_sound = new Audio('audio/health_sound.mp3');
    boss_hurt = new Audio('audio/enboss_hurt.mp3');
    intro_sound = new Audio('audio/Del Rio Bravo.mp3');
    throw_sound = new Audio('audio/throwing-3-.mp3');
    boss_fight = new Audio('audio/Spazzmatica Polka.mp3');
    collect_bottle = new Audio('audio/throwing-bottle.mp3');
    bottle_splash_sound = new Audio('audio/bottle-impact-2-.mp3');
    soundIcon = document.getElementById('sound-icon');
    game_win = new Audio('audio/win.mp3');
    coin_statusbar = new CoinsStatusbar();
    health_statusbar = new HealthStatusbar();
    bottle_statusbar = new BottleStatusbar();
    endboss_health_bar = new EndbossHealthBar();
    throwableObjects = [];
    lastThrowTime = 0;
    bottleStock = 0;
    coinStock = 0;
    throwInterval = 1500;
    collision = new Collision();
    changeButtons = new ChangeButtons();
    sound = new Sound();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initialCharacterX = this.character.x;
        this.initialEndbossX = this.endboss.x;
        this.draw();
        this.setWorldForThrowableObject();
        this.setWorld();
        this.titleScreen = new TitleScreen(this.canvas, this.startGame.bind(this));
        this.endImage = new Image();
        this.endImage.src = 'img/9_intro_outro_screens/game_over/game over.png';
        this.startButton.addEventListener('click', () => this.startGame());
        this.menuButton.addEventListener('click', () => { this.menuShown = true; this.showMenu(); });
        this.restartButton.addEventListener('click', () => { this.menuShown = false; this.restartGame(); });
        this.soundIcon.addEventListener('click', () => this.sound.switchSoundIcon());
        this.sound.makeSoundLoop();
    }

    /**
     * Displays the game menu.
     * Pauses the game over screen, sets up the title screen, clears intervals,
     * animates characters, loads character images, applies gravity,
     * resets status bars and game properties, changes button titles,
     * resets intro sound time, and starts the menu music.
     */
    showMenu() {
        this.game_over.pause();
        this.titleScreen = new TitleScreen(this.canvas, this.startGame.bind(this));
        this.clearAllIntervals();
        this.character.animate();
        this.character.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.endboss.animate();
        this.character.applyGravity();
        this.resetStatusbars();
        this.resetGameProperties();
        this.changeButtons.changeButtonsTitle();
        this.intro_sound.currentTime = 0;
        this.sound.startMusicMenu();

    }

    /**
     * Handles the game restart process when the restart button is clicked.
     * It clears all intervals, resets character properties, and reloads enemies for a new game session.
     */
    restartGame() {
        this.character.speed = 5.5;
        this.clearAllIntervals();
        this.character.animate();
        this.character.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.endboss.animate();
        this.character.applyGravity();
        this.resetStatusbars();
        this.resetGameProperties();
        this.changeButtons.changeButtonsOnRestartGame();
        this.startGame();
    }

    /**
    * Resets the status bars in the game to their initial states by loading specific images for each status bar.
    */
    resetStatusbars() {
        this.health_statusbar.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.coin_statusbar.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.bottle_statusbar.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.endboss_health_bar.loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
    }

    /**
* Clears all JavaScript intervals currently running, ensuring a clean slate for new intervals.
* This method stops all intervals from running in the window, helping to manage and prevent conflicts.
*/
    clearAllIntervals() {
        for (let i = 1; i < 999999; i++) window.clearInterval(i);
    }

    /**
    * Starts the game after clicking the "Start Game" button.
    */
    startGame() {
        this.character.fallsAsleep = 0;
        this.character.otherDirection = false;
        setTimeout(() => {
            this.character.speed = 5.5;
            this.startButton.classList.remove('d-flex');
            this.startButton.classList.add('d-none');
            this.gamePaused = false;
            this.mute = false;
            this.homeMenu = false;
            this.sound.startMusic();
            this.draw();
            this.setWorld();
            this.run();
        }, 200);
    }

    /**
    * Sets the world property for the character to this instance of World.
    */
    setWorld() {
        this.character.world = this;
        this.collision.world = this;
        this.changeButtons.world = this;
        this.sound.world = this;
        this.level.world = this;
    }

    /**
     * Resets various game properties to their initial values, preparing for a new game.
     */
    resetGameProperties() {
        this.resetEnemies();
        this.level.addObjects();
        this.currentScreen = 'title';
        this.character.energy = 100;
        this.endboss_health_bar.percentage = 100;
        this.endboss_health_bar.isVisible = false;
        this.character.x = this.initialCharacterX;
        this.endboss.x = this.initialEndbossX;
        this.endboss.bossWalking = false;
        this.bottleStock = 0;
        this.bottle_statusbar.bottle = 0;
        this.coinStock = 0;
        this.resetKeys();
        this.win = false;
        this.homeMenu = true;
    }

    /**
    * Resets the enemies in the game by removing specific enemy types from the level's enemies and clouds arrays.
    */
    resetEnemies() {
        this.level.enemies = this.level.enemies.filter(e => !(e instanceof Chicken));
        this.level.enemies = this.level.enemies.filter(e => !(e instanceof Chicks));
        this.level.clouds = this.level.enemies.filter(e => !(e instanceof Cloud));
        this.level.coins = this.level.coins.filter(e => !(e instanceof Coins));
        this.level.salsa_bottles = this.level.salsa_bottles.filter(e => !(e instanceof Bottle));
        this.level.salsa_bottles = this.level.healthItems.filter(e => !(e instanceof HealthItems));
    }

    /**
    * Resets the state of keyboard keys.
    * Sets the LEFT, RIGHT, D, and UP keys to false.
    */
    resetKeys() {
        this.keyboard.LEFT = false;
        this.keyboard.RIGHT = false;
        this.keyboard.D = false;
        this.keyboard.UP = false;
    }

    setWorldForThrowableObject() {
        this.throwableObjects.world = this;
    }

    /**
    * Runs the game loop. Checks whether the game is paused and sets up an interval for collision checks and object throwing.
    */
    run() {
        this.sound.checkIfGamePaused();
        this.collision.checkCollisionTimer();
        this.collisionTimerHit = setInterval(() => {
            this.collision.checkBottleGroundCollision();
            this.collision.checkCollisionsEnemies();
            if (this.endbossComing()) {
                this.endbossComes();
                if (!this.mute) {
                    this.game_sound.pause();
                    this.boss_fight.play();
                    this.soundArray.push(this.boss_fight);
                } else {
                    this.boss_fight.currentTime = 0;
                    this.boss_fight.pause();
                }
            }
        }, 200);
    }

    /**
 * Determines if the endboss is approaching.
 * @returns {boolean} - True if the endboss is approaching, false otherwise.
 */
    endbossComing() {
        return !this.gamePaused && -1657 > this.camera_x; //!this.gamePaused ist der eigentliche Code. Wir haben das ! rausgenommen, um das spiel überprüfen zu können.
        //Standardmäßig beträgt es -1400
    }

    /**
     * Initiates the appearance of the endboss.
     * @function
     */
    endbossComes() {
        this.endboss_health_bar.isVisible = true;
        this.endboss.bossWalking = true;
    }


    /**
     * Draws the game on the canvas.
     * Renders the title screen, sets canvas transformation,
     * adds background objects, movable objects, and bars to the map,
     * resets the canvas transformation, and requests the next animation frame.
     */
    drawGame() {
        this.titleScreen.render();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addAllMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawCharacter();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Render the character with specific transformations.
    */
    drawCharacter() {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.addAllBars();
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.restore();
    }

    /**
     * Adds all movable objects to the map.
     * Adds clouds, enemies, throwable objects, coins, health items, and salsa bottles
     * to the map for rendering and interaction purposes.
     */
    addAllMovableObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.healthItems);
        this.addObjectsToMap(this.level.salsa_bottles);
    }

    /**
     * Adds all status bars to the map.
     * Adds the health status bar, coin status bar, bottle status bar,
     * and, if the end boss health bar is visible, adds it to the map for rendering.
     */
    addAllBars() {
        this.addToMap(this.health_statusbar);
        this.addToMap(this.coin_statusbar);
        this.addToMap(this.bottle_statusbar);
        if (this.endboss_health_bar.isVisible === true) {
            this.addToMap(this.endboss_health_bar);
        }
    }

    /**
    * Renders the game by clearing the canvas, translating the context, adding objects to the map, and drawing the frame.
    */
    draw() {
        if (this.gamePaused) {
            return;
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            if (this.currentScreen === "title") {
                this.drawGame();
                this.homeMenu = true;
            } else if (this.currentScreen === "end") {
                this.renderEndScreen();
                this.homeMenu = true;
            }
        }
    }

    /**
     * Adds objects to the game map.
     * Iterates through the provided array of objects and adds each object to the map.
     * @param {Array} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    /**
     * Adds a movable object to the game map.
     * If the object's otherDirection property is true, flips the image horizontally,
     * draws the object, draws its frame, and if otherDirection is true, flips the image back.
     * @param {Object} mo - The movable object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };

    /**
     * Flips the image of a movable object horizontally.
     * Saves the current canvas state, translates the context to the object's width,
     * applies a horizontal scale transformation, and adjusts the object's position accordingly.
     * @param {Object} mo - The movable object whose image needs to be flipped horizontally.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the horizontal image flip of a movable object.
     * Adjusts the object's position to revert the horizontal flip
     * and restores the previously saved canvas state.
     * @param {Object} mo - The movable object whose flipped image needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    * Renders the end screen with game over message and buttons.
    * Clears the canvas, hides the "Start Game" button, shows the "Menu" and "Restart" buttons,
    * and displays the game over image with appropriate positioning.
    */
    renderEndScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.changeButtons.changeButtonsEndscreen();
        this.gamePaused = true;
        this.game_sound.currentTime = 0;
        this.boss_fight.currentTime = 0;
        this.sound.pauseSound();
        if (!this.mute)
            this.sound.checkGameStatusMusic();
        this.sound.muteGameAfterDelay();
        this.renderCenteredImage();
    }

    /**
     * Renders an image centered on the canvas.
     * Resets the transformation, calculates the positioning for the image to be centered,
     * and draws the image with the specified dimensions.
     */
    renderCenteredImage() {
        // Reset the transformation
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Calculate positioning for the centered image
        const endImageX = (this.canvas.width - this.endImage.width * 0.5) / 2;
        const endImageY = (this.canvas.height - this.endImage.height * 0.5) / 2;

        // Draw the image centered on the canvas
        this.ctx.drawImage(
            this.endImage,
            endImageX,
            endImageY,
            this.endImage.width * 0.5,
            this.endImage.height * 0.5
        );
    }
}