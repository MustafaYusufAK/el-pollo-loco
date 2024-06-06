class Level {
    enemies;
    backgroundObjects;
    clouds;
    salsa_bottles;
    coins;
    health_statusbar;
    bottle_statusbar;
    endboss_health_bar;
    healthItems;
    level_end_x = 2157;
    world;

    /**
     * Constructor for the Level class.
     * @param {Array} enemies - Array of enemy objects.
     * @param {Array} backgroundObjects - Array of background objects.
     * @param {Array} clouds - Array of cloud objects.
     * @param {Array} salsa_bottles - Array of salsa bottle objects.
     * @param {Array} coins - Array of coin objects.
     * @param {Array} healthItems - Array of health item objects.
     */
    constructor(enemies, backgroundObjects, clouds, salsa_bottles, coins, healthItems) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.salsa_bottles = salsa_bottles;
        this.coins = coins;
        this.healthItems = healthItems;
    };

    /**
* Adds various game objects to the level, including coins, diffrent clouds, bottles, chicken, and chicks.
*/
    addObjects() {
        this.addClouds();
        this.addMiddleDistanceClouds();
        this.addFarDistanceClouds();
        this.addBottles();
        this.addChicken();
        this.addChicks();
    }

    /**
    * Adds clouds to the level.
    */
    addClouds() {
        for (let i = 0; i < 12; i++) {
            let cloud = new Cloud();
            this.clouds.push(cloud);
        }
    }

    /**
    * Adds middle distant clouds to the level.
    */
    addMiddleDistanceClouds() {
        for (let i = 0; i < 12; i++) {
            let cloud = new MiddleDistanceCloud();
            this.clouds.push(cloud);
        }
    }

    /**
    * Adds far distant clouds to the level.
    */
    addFarDistanceClouds() {
        for (let i = 0; i < 12; i++) {
            let cloud = new FarDistanceCloud();
            this.clouds.push(cloud);
        }
    }

    /**
    * Adds bottles to the game map.
    */
    addBottles() {
        for (let i = 0; i < 7; i++) {
            const bottle = new Bottle();
            this.salsa_bottles.push(bottle);
            // this.world.addToMap(bottle);
        }
    }

    /**
     * Adds chicken enemies to the level and starts their walking animation.
     */
    addChicken() {
        for (let i = 0; i < 9; i++) {
            let chicken = new Chicken();
            this.enemies.push(chicken);
            // this.world.addToMap(chicken);
        }
    }

    /**
    * Adds chick enemies to the level and starts their walking animation.
    */
    addChicks() {
        for (let i = 0; i < 6; i++) {
            let chicks = new Chicks();
            this.enemies.push(chicks);
            // this.world.addToMap(chicks);
        }
    }
}
