


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

function openPopup() {
   document.getElementById('popup').style.display = 'block';
}
    
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}