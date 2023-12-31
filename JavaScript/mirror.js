const mirrorButton = document.getElementById('mirrorImage');
const imagePreview = document.getElementById('imagePreview');       
const ctx = imagePreview.getContext('2d');  

mirrorButton.addEventListener('click', mirror_image);

function mirror_image () 
{
    // Old image
    const imageData = ctx.getImageData(0, 0, imagePreview.width, imagePreview.height);
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    // Mirrored image
    const mirroredimageData = ctx.createImageData(imagePreview.width, imagePreview.height);
    const newPixels = mirroredimageData.data;

    for (let row = 0; row < height; row++) 
    {
        for (let col = 0; col < width; col++)
        {
            var originalIndex = (row * width + col) * 4;
            var mirroredIndex = (row * width + (width - col)) * 4;

            // Copy pixel data to the new location
            newPixels[mirroredIndex] = pixels[originalIndex];         // Red component
            newPixels[mirroredIndex + 1] = pixels[originalIndex + 1]; // Green component
            newPixels[mirroredIndex + 2] = pixels[originalIndex + 2]; // Blue component
            newPixels[mirroredIndex + 3] = pixels[originalIndex + 3]; // Alpha component
        }
    }
    ctx.putImageData(mirroredimageData, 0, 0);
}