const grayscaleButton = document.getElementById('grayscaleImage');
grayscaleButton.addEventListener('click', grayscaleImage);

const COLOR_WEIGHTS = {
    red: 0.299,
    green: 0.587,
    blue: 0.114
};

/*
For average method:
    red: 0.333,
    green: 0.333,
    blue: 0.333

For luminosity method:
    red: 0.299,
    green: 0.587,
    blue: 0.114
*/

function grayscaleImage ()
{
    let grayImage = ctx.getImageData(0, 0, imageWidth, imageHeight);
    let pixels = grayImage.data;

    for (let i = 0; i < pixels.length; i++) {
        // Extract color of each pixel
        var red = pixels[i];
        var green = pixels[i + 1];
        var blue = pixels[i + 2];

        // Use average as grayscale intensity
        var avg_color = red * COLOR_WEIGHTS.red + green * COLOR_WEIGHTS.green + blue * COLOR_WEIGHTS.blue;

        pixels[i] = avg_color;
        pixels[i + 1] = avg_color;
        pixels[i + 2] = avg_color;
    }
    ctx.putImageData(grayImage, 0, 0);
}