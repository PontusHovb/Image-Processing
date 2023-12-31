const grayscaleButton = document.getElementById('grayscaleImage');
const imagePreview = document.getElementById('imagePreview');       
const ctx = imagePreview.getContext('2d');  

grayscaleButton.addEventListener('click', image_to_grayscale);

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
        var avg_color = red / 3 + green / 3 + blue / 3;

        pixels[i] = avg_color;
        pixels[i + 1] = avg_color;
        pixels[i + 2] = avg_color;
    }
    ctx.putImageData(imageData, 0, 0);
}