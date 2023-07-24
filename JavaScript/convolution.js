
const blurImageButton = document.getElementById('blurImageButton');
blurImageButton.addEventListener('click', blurImage);

// PSF (Point Spread Function) matrix
const PSF = [
    [0.05, 0.2, 0.05],
    [0.2, 0.3, 0.2],
    [0.05, 0.2, 0.05]
  ];

function blurImage() {
    const imageData = ctx.getImageData(0, 0, imagePreview.width, imagePreview.height);
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const half = Math.floor(PSF.length / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelIndex = (y * width + x) * 4;
            let r = 0, g = 0, b = 0;

            for (let j = 0; j < PSF.length; j++) {
                for (let i = 0; i < PSF[j].length; i++) {
                    const xIndex = x + i - half;
                    const yIndex = y + j - half;

                    if (xIndex >= 0 && xIndex < width && yIndex >= 0 && yIndex < height) {
                        const neighborIndex = (yIndex * width + xIndex) * 4;
                        r += pixels[neighborIndex] * PSF[j][i];
                        g += pixels[neighborIndex + 1] * PSF[j][i];
                        b += pixels[neighborIndex + 2] * PSF[j][i];
                    }
                }
            }

            pixels[pixelIndex] = r;
            pixels[pixelIndex + 1] = g;
            pixels[pixelIndex + 2] = b;
        }
    }
    ctx.putImageData(imageData, 0, 0)
}