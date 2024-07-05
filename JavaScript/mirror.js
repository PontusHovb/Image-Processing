const mirrorButton = document.getElementById('mirrorImage');
mirrorButton.addEventListener('click', mirrorImage);

function mirrorImage () 
{
    if (originalImage) {
        resetImage();

        let mirroredImage = ctx.createImageData(imageWidth, imageHeight);
        let pixels = mirroredImage.data;         

        for (let row = 0; row < imageHeight; row++) 
        {
            for (let col = 0; col < imageWidth; col++)
            {
                var originalIndex = (row * imageWidth + col) * 4;
                var mirroredIndex = (row * imageWidth + (imageWidth - col)) * 4;

                // Copy pixel data to the new location
                pixels[mirroredIndex] = originalPixels[originalIndex];         // Red component
                pixels[mirroredIndex + 1] = originalPixels[originalIndex + 1]; // Green component
                pixels[mirroredIndex + 2] = originalPixels[originalIndex + 2]; // Blue component
                pixels[mirroredIndex + 3] = originalPixels[originalIndex + 3]; // Alpha component
            }
        }
        ctx.putImageData(mirroredImage, 0, 0);
    }
}