class Collision {

    world;

    /**
 * Removes an enemy from the level based on its type.
 * Plays the corresponding death sound and marks the enemy as dead.
 * Removes the enemy from the level after a delay.
 * @param {Object} enemy - The enemy object to be removed.
 * @param {number} index - The index of the enemy in the enemies array.
 */
    removeEnemy(enemy, index) {
        if (enemy.constructor === Chicken) {
            if (!this.world.mute)
                this.world.death_chicken.play();
            this.world.soundArray.push(this.world.death_chicken);
            enemy.dead = true;
        } else if (enemy.constructor === Chicks) {
            if (!this.world.mute)
                this.world.death_chicks.play();
            this.world.soundArray.push(this.world.death_chicks);
            enemy.dead = true;
        }
        setTimeout(() => this.world.level.enemies.splice(index, 1), 800);
    }

    /**
    * Checks if the character jumps on a chicken, removes the chicken, and triggers a jump.
    */
    checkJumpOnChicken() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (this.jumpOnChicken(enemy)) {
                this.removeEnemy(enemy, index);
                this.world.character.jump();
            }
        });
    }

    /**
* Checks if the character jumps on a chicken.
* @param {Object} enemy - The enemy object to check for jump collision.
* @returns {boolean} - True if the character jumps on the chicken, false otherwise.
*/
    jumpOnChicken(enemy) {
        return (enemy.constructor === Chicken || enemy.constructor === Chicks) &&
            this.world.character.isColliding(enemy) &&
            this.world.character.isAboveGround() &&
            this.world.character.speedY < 0
    }

    /**
 * Handles the impact of a bottle on the end boss.
 * Marks the bottle as broken, removes the bottle from throwable objects after a delay,
 * plays the end boss hurt sound, and triggers end boss hit or death logic.
 * @param {Object} bottle - The bottle object that impacts the end boss.
 * @param {number} bottleIndex - The index of the bottle in the throwable objects array.
 */
    bottleHitsEndboss(bottle, bottleIndex) {
        bottle.break = true;
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 500);
        this.world.sound.playEndbossHurtSound();
        this.endbossHitOrDeath();
    }

    /**
     * Handles the logic for the end boss being hit or reaching zero health.
     * Decreases the end boss health bar level when hit.
     * Initiates the end boss death animation if the health bar reaches zero.
     */
    endbossHitOrDeath() {
        this.world.endboss_health_bar.hit();
        if (this.world.endboss_health_bar.percentage === 0) {
            this.world.endboss.animateDeath();
        }
    }

    /**
* Checks collisions between throwable bottles and enemies, handles bottle hits, and updates the game state accordingly.
*/
    checkCollisionBottle() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.bottleCollidingChicken(bottle, enemy)) {
                    this.bottleHitsChicken(bottle, enemy, enemyIndex, bottleIndex);
                    this.world.bottle_splash_sound.play();
                } else if (this.bottleCollidingEndboss(bottle, enemy)) {
                    this.bottleHitsEndboss(bottle, bottleIndex);
                    this.world.bottle_splash_sound.currentTime = 0;
                    this.world.bottle_splash_sound.play();
                }
            });
        });
    }

    /**
    * Checks if a throwable bottle collides with a chicken.
    * @param {Object} bottle - The throwable bottle object.
    * @param {Object} enemy - The enemy object to check for collision.
    * @returns {boolean} - True if the bottle collides with the chicken, false otherwise.
    */
    bottleCollidingChicken(bottle, enemy) {
        return !bottle.break && bottle.isColliding(enemy) && (enemy.constructor === Chicken || enemy.constructor === Chicks);
    }

    bottleCollidingEndboss(bottle, enemy) {
        return !bottle.break && bottle.isColliding(enemy) && enemy.constructor === Endboss;
    }

    /**
    * Handles bottle hits on chickens, breaks the bottle, removes the chicken, and updates the game state.
    * @param {Object} bottle - The throwable bottle object.
    * @param {Object} enemy - The chicken object to be hit.
    * @param {number} enemyIndex - The index of the enemy in the enemies array.
    * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
    */
    bottleHitsChicken(bottle, enemy, enemyIndex, bottleIndex) {
        bottle.break = true;
        this.removeEnemy(enemy, enemyIndex);
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 500);
    }

    /**
 * Collects health items when the character collides with them.
 * Iterates through the health items in the level.
 * If the character collides with a health item, increases the character's health,
 * updates the health status bar, removes the collected health item from the level,
 * resets the health sound time, and plays the health collection sound.
 */
    collectHealthItems() {
        for (let i = this.world.level.healthItems.length - 1; i >= 0; i--) {
            if (this.world.character.isColliding(this.world.level.healthItems[i])) {
                this.world.character.contactWithLifeItem();
                this.world.health_statusbar.setPercentageByHealthItem(this.world.character.energy);
                this.world.level.healthItems.splice(i, 1); // Remove the object from the array
                this.world.health_sound.currentTime = 0;
                this.world.health_sound.play();
                this.world.soundArray.push(this.world.health_sound);
            }
        }
    }

    /**
* Collects salsa bottles when the character collides with them.
* Iterates through the salsa bottles in the level.
* If the character collides with a salsa bottle and the bottle stock is not full,
* collects the bottle; otherwise, checks if the bottle storage is full.
*/
    collectBottles() {
        for (let i = this.world.level.salsa_bottles.length - 1; i >= 0; i--) {
            if (this.world.character.isColliding(this.world.level.salsa_bottles[i])) {
                if (this.world.bottleStock === 6) {
                    this.checkIfBottleStorageFull();
                } else {
                    this.collectBottle(i);
                }
            }
        }
    }

    /**
     * Checks if the bottle storage is full.
     * Updates the bottle stock value and the bottle status bar accordingly.
     */
    checkIfBottleStorageFull() {
        this.world.bottleStock;
        this.world.bottle_statusbar.setBottleValue(this.world.bottleStock);
    }

    /**
     * Collects a salsa bottle.
     * Increases the bottle stock count, updates the bottle status bar with the new stock value,
     * removes the collected bottle from the level, resets the collect bottle sound time,
     * and plays the collect bottle sound.
     * @param {number} value - The index of the collected bottle in the salsa bottles array.
     */
    collectBottle(value) {
        this.world.bottleStock++;
        this.world.bottle_statusbar.setBottleValue(this.world.bottleStock);
        this.world.level.salsa_bottles.splice(value, 1);
        this.world.collect_bottle.currentTime = 0;
        this.world.collect_bottle.play();
        this.world.soundArray.push(this.world.collect_bottle);
    }

    /**
* Checks collisions between the character and chickens, handles damage and updates the health bar accordingly.
*/
    checkCollisionsChickens() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.collidingChicken(enemy)) {
                if (!this.world.gamePaused) {
                    if (!this.world.mute)
                        this.world.hurt.play();
                    this.world.character.hit();
                    this.world.health_statusbar.setPercentageHealthBar(this.world.character.energy);
                }
            }
        });
    }

    /**
     * Checks if the character is colliding with a chicken.
     * @param {Object} enemy - The enemy object to check for collision.
     * @returns {boolean} - True if the character is colliding with a chicken, false otherwise.
     */
    collidingChicken(enemy) {
        return this.world.character.isColliding(enemy) && enemy instanceof Chicken && !this.world.character.isAboveGround();
    }

    /**
 * Checks collisions between the character and chicks, handles damage, and updates the health bar accordingly.
 */
    checkCollisionChicks() {
        this.world.level.enemies.forEach(enemy => {
            if (this.collidingChicks(enemy)) {
                if (!this.world.gamePaused) {
                    if (!this.world.mute)
                        this.world.hurt.play();
                    this.world.character.hit();
                    this.world.health_statusbar.setPercentageHealthBar(this.world.character.energy);
                }
            }
        });
    }

    /**
    * Checks if the character is colliding with chicks.
    * @param {Object} enemy - The enemy object to check for collision.
    * @returns {boolean} - True if the character is colliding with chicks, false otherwise.
    */
    collidingChicks(enemy) {
        return this.world.character.isColliding(enemy) && enemy instanceof Chicks;
    }

    /**
     * Checks collision with the end boss.
     * Iterates through the enemies in the level and checks collision with the end boss.
     * If collision occurs and the game is not paused, plays a hurt sound if not muted,
     * decreases the character's health, and updates the health status bar.
     */
    checkCollisionBoss() {
        this.world.level.enemies.forEach(enemy => {
            if (this.collidingEndBoss(enemy)) {
                if (!this.world.gamePaused) {
                    if (!this.world.mute) {
                        this.world.hurt.play();
                    }
                    this.world.character.bigHit();
                    this.world.health_statusbar.setPercentageHealthBar(this.world.character.energy);
                }
            }
        });
    }

    /**
    * Checks if the character is colliding with chicks.
    * @param {Object} enemy - The enemy object to check for collision.
    * @returns {boolean} - True if the character is colliding with chicks, false otherwise.
    */
    collidingEndBoss(enemy) {
        return this.world.character.isColliding(enemy) && enemy instanceof Endboss;
    }

    /**
 * Collects coins when the character collides with them.
 * Iterates through the coins in the level.
 * If the character collides with a coin, increases the character's coin count,
 * updates the coin status bar, removes the collected coin from the level,
 * resets the coin collection sound time, and plays the coin collection sound.
 */
    collectCoins() {
        for (let i = this.world.level.coins.length - 1; i >= 0; i--) {
            if (this.world.character.isColliding(this.world.level.coins[i])) {
                if (this.world.coinStock === 6) {
                    this.checkIfCoinStorageFull();
                } else {
                    this.world.coinStock++;
                    this.world.coin_statusbar.setCoinValue(this.world.coinStock);
                    this.world.level.coins.splice(i, 1);
                    this.world.collect_coin.currentTime = 0;
                    this.world.collect_coin.play();
                    this.world.soundArray.push(this.world.collect_coin);
                }
            }
        }
    }

    /**
 * Checks if the bottle storage is full.
 * Updates the bottle stock value and the bottle status bar accordingly.
 */
    checkIfCoinStorageFull() {
        this.world.coinStock;
        this.world.coin_statusbar.setCoinValue(this.world.coinStock);
    }

    /**
 * Throws a bottle from the character's position.
 * Creates a throwable bottle object at an offset position from the character,
 * plays a throw sound, adds the bottle to the throwable objects array,
 * updates the last throw time, decreases the bottle stock count,
 * and updates the bottle status bar with the new stock value.
 * @param {number} currentTime - The current time when the bottle is thrown.
 */
    throwTheBottle(currentTime) {
        this.bottle = new ThrowableObject(this.world.character.x + 25, this.world.character.y + 80, this.world.character.otherDirection);
        this.world.throw_sound.play();
        this.world.soundArray.push(this.world.throw_sound);
        this.world.throwableObjects.push(this.bottle);
        this.world.lastThrowTime = currentTime;
        this.world.bottleStock--;
        this.world.bottle_statusbar.setBottleValue(this.world.bottleStock);
    }

    /**
     * Checks for throwable objects and initiates the throwing process if conditions are met.
     * If the character is in the process of throwing a bottle,
     * resets the character's fallsAsleep counter.
     * Checks if enough time has passed since the last throw based on the throw interval.
     * If there are bottles in stock and enough time has elapsed, initiates the bottle throwing process.
     */
    checkThrowObjects() {
        if (this.throwingBottle()) {
            this.world.character.fallsAsleep = 0;
            const currentTime = Date.now();
            if (currentTime - this.world.lastThrowTime >= this.world.throwInterval) {
                if (this.world.bottleStock > 0) {
                    this.throwTheBottle(currentTime);
                }
            }
        }
    }

    /**
    * Checks if the 'D' key is pressed.
    * @returns {boolean} - True if the 'D' key is pressed, false otherwise.
    */
    throwingBottle() {
        return this.world.keyboard.D;
    }

    /**
* Checks the timer of the collisions.
*/
    checkCollisionTimer() {
        this.collisionTimer = setInterval(() => this.checkCollision(), 50);
    }

    /**
* Checks various collisions.
*/
    checkCollision() {
        this.checkJumpOnChicken();
        this.checkThrowObjects();
        this.checkCollisions();
    }

    /**
 * Checks for various collisions in the game.
 * Invokes methods to handle coin collection, bottle collection,
 * health item collection, jumping on chickens, and bottle collisions.
 */
    checkCollisions() {
        this.collectCoins();
        this.collectBottles();
        this.collectHealthItems();
        this.checkJumpOnChicken();
        this.checkCollisionBottle();
    }

    /**
 * Checks for collision between bottles and the ground.
 * Compares the current time to the time of the last throw for each throwable bottle.
 * If a bottle has been thrown for at least 1300ms and has not yet broken upon collision,
 * marks it as broken, plays a bottle splash sound, and removes the bottle after a delay.
 */
    checkBottleGroundCollision() {
        const currentTime = Date.now();
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            const timeDifference = currentTime - this.world.lastThrowTime;
            if (timeDifference >= 1300 && !bottle.break) {
                bottle.break = true;
                this.world.bottle_splash_sound.play();
                setTimeout(() => {
                    this.world.throwableObjects.splice(bottleIndex, 1);
                }, 500);
            }
        });
    }

    /**
* Checks collisions with enemies.
*/
    checkCollisionsEnemies() {
        this.checkCollisionsChickens();
        this.checkCollisionChicks();
        this.checkCollisionBoss();
    }
}