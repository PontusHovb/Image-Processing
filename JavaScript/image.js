const imagePreview = document.getElementById('imagePreview');
const ctx = imagePreview.getContext('2d');
let originalImage = null;

const imageInput = document.getElementById('imageInput');
const resetButton = document.getElementById('resetImage');
imageInput.addEventListener('change', handleImageSelect);    
resetButton.addEventListener('click', resetImage);   

const MAX_WIDTH = 400;                                                          // Maximum width for the canvas
const MAX_HEIGHT = 300;                                                         // Maximum height for the canvas

// Display image once it has been uploaded
function handleImageSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            displayImage(event.target.result)
        };
        

        reader.readAsDataURL(file);
    }
}

function displayImage(imageSource) {
        const img = new Image();
        img.onload = function () {
            imagePreview.width = img.width;
            imagePreview.height = img.height;
            ctx.drawImage(img, 0, 0);                                           // Draw the image on the canvas
            originalImage = ctx.getImageData(0, 0, img.width, img.height);      // Save image
        };
        img.src = imageSource;
}

function resetImage() {
    if (originalImage) {
        ctx.putImageData(originalImage, 0, 0);                                  // Restore the original image data
    }
    zoomSlider.value = 1;
}