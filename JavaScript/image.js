const imagePreview = document.getElementById('imagePreview');
const ctx = imagePreview.getContext('2d');

// Input image
const imageInput = document.getElementById('imageInput');
imageInput.addEventListener('change', handleImageSelect);

// Save image
const saveButton = document.getElementById('saveImage');
saveButton.addEventListener('click', saveImage);

// Remove image
const removeButton = document.getElementById('removeImage');
removeButton.addEventListener('click', removeImage);

// Reset modifications
const resetButton = document.getElementById('resetImage');
resetButton.addEventListener('click', resetImage);   

// Initialize variacles
let uploadedImage = null;
let originalImage = null;
let originalPixels = null;
let imageWidth = null;
let imageHeight = null;

MAX_HEIGHT = 400;

// Display image once it has been uploaded
function handleImageSelect(event) {
    resetImage();
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
        // TODO: Set max width and/or height
        imagePreview.width = img.width;
        imagePreview.height = img.height;
        ctx.drawImage(img, 0, 0);                                           // Draw the image on the canvas

        // Set constants
        uploadedImage = "Yes";
        originalImage = ctx.getImageData(0, 0, img.width, img.height); 
        originalPixels = originalImage.data;
        imageWidth = img.width;
        imageHeight = img.height;
    };
    img.src = imageSource;
    imageInput.classList.add('hidden');
}

function resetOriginalImage() {
    uploadedImage = null;
    originalImage = null;
    originalPixels = null;
    imageWidth = null;
    imageHeight = null;
}

// TODO: Handle multiple file formats
function saveImage() {
    if (uploadedImage) {
        const dataURL = imagePreview.toDataURL('image/jpeg');
                
        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'image.jpeg';
        link.click();
    }
}

function removeImage() {
    if (originalImage) {
        ctx.clearRect(0, 0, imageWidth, imageHeight);
    }
    resetOriginalImage();
    imageInput.classList.remove('hidden');
}

function resetImage() {
    if (originalImage) {
        ctx.putImageData(originalImage, 0, 0);                              // Restore the original image data
    }
    zoomSlider.value = 1;
}