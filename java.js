


// Function to generate QR code
function generateQRCode() {
    var textToEncode = document.getElementById('text').value;

    // Create QR code
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: textToEncode,
        width: 128,
        height: 128
    });

    updateQRCodeContainerStyling();
    convertQRCodeToImageAndShare();
}

function convertQRCodeToImageAndShare() {
    // Capture the QR code as an image
    html2canvas(document.getElementById('qrcode')).then(function(canvas) {
        // Convert canvas to base64 image data
        var imageData = canvas.toDataURL('image/png');

        // Update share links
        updateShareLinks(imageData);
    });
}



function updateShareLinks(imageData) {
    // Twitter
    document.getElementById('twitterLink').href = 'https://twitter.com/share?url=' + encodeURIComponent(imageData);

    // Facebook
    document.getElementById('facebookLink').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(imageData);

    // Reddit
    document.getElementById('redditLink').href = 'https://reddit.com/submit?url=' + encodeURIComponent(imageData);

    // LinkedIn
    document.getElementById('linkedinLink').href = 'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(imageData);

    document.getElementById('emailLink').href = 'mailto:?subject=QR Code&body=' + encodeURIComponent('Check out this QR Code: ' + imageData);
}

function showAnimatedDiv() {
    var animatedDiv = document.getElementById('animatedDiv');

    // Toggle the visibility of the div
    animatedDiv.style.display = animatedDiv.style.display === 'none' ? 'block' : 'none';

    // Triggering reflow to restart the animation
    void animatedDiv.offsetWidth;

    // Apply the animation styles
    animatedDiv.style.opacity = animatedDiv.style.opacity === '0' ? '1' : '0';
    animatedDiv.style.transform = animatedDiv.style.transform === 'translate(-50%, -50%)' ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)';
}

    async function startCamera() {
        const name = document.getElementById('name').value;
        if (name == '') {
            alert('Please enter your name before starting the camera.');
            return;
        }
        try {
            
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.style.display = 'block';

            video.addEventListener('click', () => {
                stopCamera(stream);
                const rating = generateRandomRating();
                showRatingPopup(name, rating);
            });
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    function stopCamera(stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        document.getElementById('video').style.display = 'none';
    }


    function showRatingPopup(name, rating) {
        alert(`${name}, your rating: ${rating}`);
    }
    function generateRandomRating() {
        return Math.floor(Math.random() * 5) + 1;
    }
