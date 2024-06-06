/**
 * Represents a drawable object in the application.
 * @class
 */
class DrawableObject {

    x = -1200;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {}; // Ist der Image-Speicher.
    currentImage = 0;

    /**
     * Loads an image from the provided path.
     * @function loadImage
     * @param {string} path - The path to the image file.
     * @memberof DrawableObject
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the provided array of paths and caches them.
     * @function loadImages
     * @param {Array.<string>} arr - An array containing paths to multiple image files.
     * @memberof DrawableObject
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image onto the provided canvas context at specified coordinates and dimensions.
     * @function draw
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @memberof DrawableObject
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object on the provided canvas context based on its type.
     * @function drawFrame
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @memberof DrawableObject
     */
    drawFrame(ctx) {
        {
            ctx.beginPath();
            ctx.stroke();
        }
    }


}