const grayscaleButton = document.getElementById('grayscaleImage');
const imagePreview = document.getElementById('imagePreview');       
const ctx = imagePreview.getContext('2d');  

grayscaleButton.addEventListener('click', image_to_grayscale);

const COLOR_WEIGHTS = {
    red: 0.333,
    green: 0.333,
    blue: 0.333
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

function image_to_grayscale ()
{
    const imageData = ctx.getImageData(0, 0, imagePreview.width, imagePreview.height);
    const pixels = imageData.data;

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
    ctx.putImageData(imageData, 0, 0);
}