
const deconvoluteButton = document.getElementById('deconvoluteImage');
deconvoluteButton.addEventListener('click', deconvoluteImage);

import * as fftjs from './node_modules/fft-js';

// Deconvolute image using fourier transform
function deconvoluteImage() {
    const imageData = ctx.getImageData(0, 0, imagePreview.width, imagePreview.height);
    console.log(imageData.data)
    const imgFFT = fft2D(fft2D(imageData.data))
    console.log(imgFFT)
}

function fft2D(img) {
  const imgFFT = fft.fft2d(img);
  return imgFFT;
}