/**
 * Level 1 configuration.
 * @type {Level}
 */
const level1 = new Level(
    // Enemies
    [
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicks(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicks(),
        new Endboss()
    ],

    // Background objects
    [
        new BackgroundObject('img/5_background/layers/air.png', -719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', -719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 718),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718),

        new BackgroundObject('img/5_background/layers/air.png', 718 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 718 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 718 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 4)
    ],

    // Clouds
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new MiddleDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud(),
        new FarDistanceCloud()
    ],

    // Salsa bottles
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],

    // Coins
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ],

    // Health items
    [new HealthItems(),
    new HealthItems(),
    new HealthItems(),
    new HealthItems(),
    new HealthItems()
    ],
);