
const unBlurImageButton = document.getElementById('unBlurImageButton');
unBlurImageButton.addEventListener('click', unBlurImage);

function unBlurImage() {
    const width = image[0].length;
    const height = image.length;
    const result = [];

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            let realPart = 0;
            let imagPart = 0;
            for (let y2 = 0; y2 < height; y2++) {
                for (let x2 = 0; x2 < width; x2++) {
                    const pixelValue = image[y2][x2]
                    const phase = -2 * Math.PI * ((x * x2) / width + (y * y2)  / height);
                    realPart += pixelValue * Math.cos(phase);
                    imagPart += pixelValue * Math.sin(phase);
                }
            }
            row.push({re: realPart, imag: imagPart});
        }
        result.push(row)
    }
    return result;
}

function fourierTransform(imageMatrix) {
    const width = imageMatrix[0].length;
    const height = imageMatrix.length;
    const result = [];
  
    for (let v = 0; v < height; v++) {
      const row = [];
      for (let u = 0; u < width; u++) {
        let realPart = 0;
        let imagPart = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixelValue = imageMatrix[y][x];
            const phase = -2 * Math.PI * ((u * x) / width + (v * y) / height);
            realPart += pixelValue * Math.cos(phase);
            imagPart += pixelValue * Math.sin(phase);
          }
        }
        row.push({ re: realPart, im: imagPart });
      }
      result.push(row);
    }
  
    return result;
}
  
  