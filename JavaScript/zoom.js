const zoomButton = document.getElementById('zoomSlider');
zoomButton.addEventListener('input', zoomImage);

function zoomImage () 
{
    if (originalImage) {
        const zoomFactor = parseFloat(zoomSlider.value);
        let width = Math.round(originalImage.width * zoomFactor);
        let height = Math.round(originalImage.height * zoomFactor);

        const scaledImageData = ctx.createImageData(width, height);
        const originalData = originalImage.data;
        const scaledData = scaledImageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Get the position in the original image
                const origX = Math.floor(x / zoomFactor);
                const origY = Math.floor(y / zoomFactor);

                // Get the indices in the data arrays
                const origIndex = (origY * originalImage.width + origX) * 4;
                const scaledIndex = (y * width + x) * 4;

                // Copy the pixel data
                scaledData[scaledIndex] = originalData[origIndex];
                scaledData[scaledIndex + 1] = originalData[origIndex + 1];
                scaledData[scaledIndex + 2] = originalData[origIndex + 2];
                scaledData[scaledIndex + 3] = originalData[origIndex + 3];
            }
        }

        // Clear the canvas
        ctx.clearRect(0, 0, imagePreview.width, imagePreview.height);

        // Calculate the offsets to center the zoomed image
        const offsetX = (imagePreview.width - width) / 2;
        const offsetY = (imagePreview.height - height) / 2;

        // Put the scaled image data onto the main canvas
        ctx.putImageData(scaledImageData, offsetX, offsetY);
    }
}