const zoomButton = document.getElementById('zoomSlider');
zoomButton.addEventListener('input', zoomImage);

function zoomImage () 
{
    if (originalImage) {
        const zoomFactor = parseFloat(zoomSlider.value);
        let width = Math.round(imageWidth * zoomFactor);
        let height = Math.round(imageHeight * zoomFactor);

        let scaledImageData = ctx.createImageData(width, height);
        let pixels = scaledImageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Get the position in the original image
                const origX = Math.floor(x / zoomFactor);
                const origY = Math.floor(y / zoomFactor);

                // Get the indices in the data arrays
                const origIndex = (origY * imageWidth + origX) * 4;
                const scaledIndex = (y * width + x) * 4;

                // Copy the pixel data
                pixels[scaledIndex] = originalPixels[origIndex];
                pixels[scaledIndex + 1] = originalPixels[origIndex + 1];
                pixels[scaledIndex + 2] = originalPixels[origIndex + 2];
                pixels[scaledIndex + 3] = originalPixels[origIndex + 3];
            }
        }

        // Calculate the offsets to center the zoomed image
        const offsetX = (imageWidth - width) / 2;
        const offsetY = (imageHeight - height) / 2;

        ctx.putImageData(scaledImageData, offsetX, offsetY);
    }
}