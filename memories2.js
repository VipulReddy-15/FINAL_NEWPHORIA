console.log('JS connected');
document.getElementById("imageForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let file = document.getElementById("image").files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function() {
            // Resize image before displaying
            let img = new Image();
            img.onload = function() {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");

                // Define maximum dimensions for resized image
                let maxWidth = 300;
                let maxHeight = 300;

                let width = img.width;
                let height = img.height;

                // Calculate new dimensions to maintain aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // Resize image
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Display the resized image along with name and description
                let resizedImg = document.createElement("img");
                resizedImg.src = canvas.toDataURL();
                resizedImg.alt = name;
                let caption = document.createElement("figcaption");
                caption.textContent = `${name}: ${description}`;
                let figure = document.createElement("figure");
                figure.appendChild(resizedImg);
                figure.appendChild(caption);
                document.getElementById("imageGallery").appendChild(figure);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});