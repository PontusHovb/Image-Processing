const convoluteButton = document.getElementById('convoluteImage');
const unConvoluteButton = document.getElementById('unConvoluteImage');
convoluteButton.addEventListener('click', convoluteImage);
unConvoluteButton.addEventListener('click', unConvoluteImage);

PSF_MATRIX_SIZE = 10;
CONVOLUTE_FACTOR = 8;

// Returns gaussian PSF (Point Spread Function) of given size
function createGaussianPSF(size, sigma) {
    const center = Math.floor(size / 2);
    const PSF = [];
  
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        const distanceSquared = (x - center) ** 2 + (y - center) ** 2;
        const factor = Math.exp(-distanceSquared / (2 * sigma * sigma));
        row.push(factor);
      }
      PSF.push(row);
    }
  
    // Normalize the PSF so that sum of all elements equals 1
    const total = PSF.reduce((acc, row) => acc + row.reduce((sum, val) => sum + val, 0), 0);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        PSF[y][x] /= total;
      }
    }
  
    return PSF;
}

// Convolute displayed image 
function convoluteImage() {
  if (originalImage) {
    resetImage();
    const PSF = createGaussianPSF(PSF_MATRIX_SIZE, CONVOLUTE_FACTOR);
    const half = Math.floor(PSF_MATRIX_SIZE / 2);

    let convolutedImage = ctx.createImageData(imageWidth, imageHeight);
    let pixels = convolutedImage.data;
    
    for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
            const pixelIndex = (y * imageWidth + x) * 4;
            let r = 0, g = 0, b = 0;

            for (let j = 0; j < PSF_MATRIX_SIZE; j++) {
                for (let i = 0; i < PSF_MATRIX_SIZE; i++) {
                    const xIndex = x + i - half;
                    const yIndex = y + j - half;

                    if (xIndex >= 0 && xIndex < imageWidth && yIndex >= 0 && yIndex < imageHeight) {
                        const neighborIndex = (yIndex * imageWidth + xIndex) * 4;
                        r += originalPixels[neighborIndex] * PSF[j][i];
                        g += originalPixels[neighborIndex + 1] * PSF[j][i];
                        b += originalPixels[neighborIndex + 2] * PSF[j][i];
                    }
                }
            }

            pixels[pixelIndex] = r;
            pixels[pixelIndex + 1] = g;
            pixels[pixelIndex + 2] = b;
            pixels[pixelIndex + 3] = originalPixels[pixelIndex + 3];
        }
    }
    
    ctx.putImageData(convolutedImage, 0, 0);
  }
}

// TODO: Fix this to not affect other variables
function unConvoluteImage() {
  ctx.putImageData(originalImage, 0, 0);
}