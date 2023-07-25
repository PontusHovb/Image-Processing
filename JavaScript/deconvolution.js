
const fft = require('fft.js');const fft = require('fft.js');

const unBlurImageButton = document.getElementById('unBlurImageButton');
unBlurImageButton.addEventListener('click', unBlurImage);

function unBlurImage() {
    const imageData = ctx.getImageData(0, 0, imagePreview.width, imagePreview.height);
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    console.log("PICTURE BEFORE\n")
    console.log(pixels)
    const transformedImage = fft2D(pixels)
    console.log("PICTURE AFTER\n")
    console.log(transformedImage)
}

function fft2D(inputMatrix) {
    const rows = inputMatrix.length;
    const cols = inputMatrix[0].length;

    // Initialize 2D complex array for input data
    const input = new Array(rows);
    for (let i = 0; i < rows; i++) {
      input[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        input[i][j] = { re: inputMatrix[i][j], im: 0 };
      }
    }

    // Perform FFT on rows
    for (let i = 0; i < rows; i++) {
      input[i] = FFT(input[i]);
    }

    // Transpose the matrix for column-wise FFT
    const transposedInput = new Array(cols);
    for (let j = 0; j < cols; j++) {
      transposedInput[j] = new Array(rows);
      for (let i = 0; i < rows; i++) {
        transposedInput[j][i] = input[i][j];
      }
    }

    // Perform FFT on columns
    for (let j = 0; j < cols; j++) {
      transposedInput[j] = FFT(transposedInput[j]);
    }

    // Transpose back to the original orientation
    const output = new Array(cols);
    for (let j = 0; j < cols; j++) {
      output[j] = new Array(rows);
      for (let i = 0; i < rows; i++) {
        output[j][i] = transposedInput[i][j];
      }
    }

    // Return the transformed 2D array
    return output;
}