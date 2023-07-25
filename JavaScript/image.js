
const imageInput = document.getElementById('imageInput');           
const imagePreview = document.getElementById('imagePreview');       
const ctx = imagePreview.getContext('2d');                          

imageInput.addEventListener('change', handleImageSelect);               

// Display image once it has been uploaded
function handleImageSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                imagePreview.width = img.width;
                imagePreview.height = img.height;
                ctx.drawImage(img, 0, 0);           // Draw the image on the canvas
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
}
