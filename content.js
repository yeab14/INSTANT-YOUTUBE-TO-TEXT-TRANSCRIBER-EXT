// Funpopupction to create the transcription popup
function createTranscriptionPopup(transcript) {
    let popup = document.getElementById('transcription-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'transcription-popup';
        popup.classList.add('transcription-popup');
        popup.style.position = 'fixed';
        popup.style.top = '80px';  // Adjusted top position for better visibility
        popup.style.right = '3px';  // Adjusted right position for better alignment
        popup.style.zIndex = '9999';
        popup.style.padding = '10px';  // Added padding for the whole popup
        popup.style.backgroundColor = '#fff';  // Light gray background
        popup.style.border = 'solid #dc3545';  // Red border
        // popup.style.borderRadius = '5px';
        popup.style.overflowX = 'hidden'; 
        popup.style.width = '400px';  // Increased width for better readability
        popup.style.maxHeight = '75vh';  // Limited maximum height for better scrolling
        popup.style.overflowY = 'auto';  // Added auto scrolling
        popup.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';  // Shadow effect
        popup.style.fontFamily = 'Georgia, Times, serif';  // Set font family
        document.body.appendChild(popup);

// Title bar for the popup
const titleBar = document.createElement('div');
titleBar.style.background = 'linear-gradient(to right, #dc3545, #ffffff)';  // Gradient background
titleBar.style.color = '#fff';  // Black text color
titleBar.style.width = '370px';  // Increased width for better readability
titleBar.style.maxHeight = '40px';  // Limit height for a compact title bar
// titleBar.style.borderTopLeftRadius = '10px';  // Rounded corners
// titleBar.style.borderTopRightRadius = '10px';
titleBar.style.padding = '10px';  // Padding inside title bar
titleBar.style.fontFamily = 'Arial, sans-serif';  // Set font family
titleBar.style.fontSize = '20px';  // Larger font size for title
titleBar.style.fontWeight = 'bold';  // Bold text
titleBar.style.textTransform = 'uppercase';  // Uppercase text
titleBar.style.right = '30px';
titleBar.style.justifyContent = 'center';  // Center align horizontally
titleBar.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.2)';  // Shadow effect
titleBar.textContent = 'Transcribed Text';  // Title text

popup.appendChild(titleBar);

 // Event listener to close popup when clicking outside
 document.addEventListener('click', (event) => {
    if (!popup.contains(event.target)) {
        popup.style.display = 'none';
    }
});




// Container for the buttons inside the title bar
const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'absolute';
buttonContainer.style.top = '15px';
buttonContainer.style.right = '35px';
buttonContainer.style.display = 'flex';
buttonContainer.style.gap = '15px';  // Adjusted gap between buttons
buttonContainer.style.alignItems = 'center';  // Center align items
titleBar.appendChild(buttonContainer);

// Function to show a toast message
function showToastMessage(message, isSuccess) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.background = 'linear-gradient(45deg, #dc3545, #ffffff)';  // Gradient background at 45 degrees
    toast.style.color = '#fff';  // Text color
    toast.style.fontFamily = 'Arial, sans-serif';  // Font family
    toast.style.fontSize = '16px';  // Font size
    toast.style.fontWeight = 'bold';  // Font weight
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';  // Shadow for depth
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease-in-out';
    toast.style.zIndex = '9999';

    document.body.appendChild(toast);

    // Fade in toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Fade out toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 400);
    }, 3000);
}


// Stylish copy button (icon)
const copyButton = document.createElement('button');
copyButton.innerHTML = '&#128203;';  // Clipboard icon
copyButton.style.width = '30px';  // Increased width
copyButton.style.height = '30px';  // Set height for equal size
copyButton.style.padding = '8px';  // Increased padding for better click area
copyButton.style.backgroundColor = '#007bff';  // Blue color for copy button
copyButton.style.color = '#ffffff';  // White text
copyButton.style.border = 'none';
copyButton.style.borderRadius = '50%';
copyButton.style.cursor = 'pointer';
copyButton.style.fontSize = '14px';  // Font size for the icon
copyButton.style.display = 'flex';
copyButton.style.alignItems = 'center';
copyButton.style.justifyContent = 'center';
copyButton.addEventListener('mouseenter', () => {
    copyButton.style.backgroundColor = '#0056b3';  // Darker blue on hover
});
copyButton.addEventListener('mouseleave', () => {
    copyButton.style.backgroundColor = '#007bff';  // Restore original blue after hover
});
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(transcript)
        .then(() => {
            console.log('Text copied to clipboard');
            // Show a toast or message indicating success
            showToastMessage('Text copied successfully', true); // Success message
        })
        .catch(err => {
            console.error('Unable to copy text: ', err);
            // Handle error
            showToastMessage('Failed to copy text', false); // Error message
        });
});

document.body.appendChild(copyButton);


// Stylish hide button (icon)
const hideButton = document.createElement('button');
hideButton.innerHTML = '&#10006;';  // Close icon
hideButton.style.width = '30px';  // Increased width
hideButton.style.height = '30px';  // Set height for equal size
hideButton.style.padding = '8px';  // Increased padding for better click area
hideButton.style.backgroundColor = '#dc3545';  // Red color for hide button
hideButton.style.color = '#ffffff';  // White text
hideButton.style.border = 'none';
hideButton.style.borderRadius = '50%';
hideButton.style.cursor = 'pointer';
hideButton.style.fontSize = '14px';  // Font size for the icon
hideButton.style.display = 'flex';
hideButton.style.alignItems = 'center';
hideButton.style.justifyContent = 'center';
hideButton.addEventListener('mouseenter', () => {
    hideButton.style.backgroundColor = '#c82333';  // Darker red on hover
});
hideButton.addEventListener('mouseleave', () => {
    hideButton.style.backgroundColor = '#dc3545';  // Restore original red after hover
});
hideButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Add the updated buttons to the button container
buttonContainer.appendChild(copyButton);
buttonContainer.appendChild(hideButton);


// Styling for the transcript text
const transcriptText = document.createElement('div');
transcriptText.innerText = transcript;
transcriptText.style.fontSize = '14px';  // Increased font size
transcriptText.style.lineHeight = '1.5';  // Improved line height
transcriptText.style.marginTop = '20px';  // Added space above text
transcriptText.style.marginBottom = '20px';  // Added space below text
transcriptText.classList.add('transcript-text');
popup.appendChild(transcriptText);


// Rate Us - 5 stars widget
const rateUsContainer = document.createElement('div');
rateUsContainer.style.marginTop = '20px';  // Added space above the widget

// Check if user has already rated
const userHasRated = localStorage.getItem('userHasRated');

if (!userHasRated) {
    const rateUsHeader = document.createElement('div');
    rateUsHeader.style.display = 'flex';
    rateUsHeader.style.alignItems = 'center';
    rateUsHeader.style.marginBottom = '10px';

    const rateUsText = document.createElement('span');
    rateUsText.innerText = 'Enjoyed our transcription service? ';
    rateUsText.style.fontSize = '16px';  // Font size
    rateUsText.style.fontWeight = 'bold';  // Bold font weight
    rateUsText.style.color = '#dc3545';  // Dark text color

    const emoji = document.createElement('span');
    emoji.innerHTML = '&#x1F60A;';  // Smiling face emoji
    emoji.style.fontSize = '26px';  // Emoji size
    emoji.style.marginRight = '10px';  // Space between text and emoji

    rateUsHeader.appendChild(rateUsText);
    rateUsHeader.appendChild(emoji);

    const starIconsContainer = document.createElement('div');
    starIconsContainer.style.display = 'flex';
    starIconsContainer.style.alignItems = 'center';

    const starIcons = [];
    let currentRating = 0;

    const updateStars = (rating) => {
        starIcons.forEach((star, index) => {
            star.style.color = index < rating ? '#dc3545' : '#c0c0c0';
        });
    };

    for (let i = 1; i <= 5; i++) {
        const starIcon = document.createElement('span');
        starIcon.innerHTML = '&#9733;';  // Unicode star character
        starIcon.style.fontSize = '26px';  // Star icon size
        starIcon.style.color = '#c0c0c0';  // Gray color for unselected stars
        starIcon.style.cursor = 'pointer';
        starIcon.addEventListener('mouseenter', () => {
            updateStars(i);
        });
        starIcon.addEventListener('mouseleave', () => {
            updateStars(currentRating);
        });
        starIcon.addEventListener('click', () => {
            currentRating = i;
            updateStars(currentRating);
            localStorage.setItem('userHasRated', 'true');  // Save rating state

            // Hide the rate us widget
            rateUsContainer.style.display = 'none';

            // Redirect based on rating
            if (currentRating >= 4) {
                window.open('https://www.google.com', '_blank');
            } else {
                window.open('https://www.youtube.com/hashtag/funnyvideo', '_blank');
            }
        });
        starIcons.push(starIcon);
        starIconsContainer.appendChild(starIcon);
    }

    rateUsHeader.appendChild(starIconsContainer);
    rateUsContainer.appendChild(rateUsHeader);
    popup.appendChild(rateUsContainer);
   
}


    } else {
        // Update existing popup with new transcript
        const transcriptText = popup.querySelector('.transcript-text');
        if (transcriptText) {
            transcriptText.innerText = transcript;
        }
        popup.style.display = 'block';
    }
}



function handleFullscreenChange() {
    const button = document.getElementById('transcription-button');
    if (button) {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            // In full-screen mode: position at bottom right
            button.style.top = ''; // Clear top position
            button.style.bottom = '10px';
            button.style.right = '260px';
        } else {
            // Not in full-screen mode: position at top right
            button.style.top = '8px';
            button.style.bottom = '';
            button.style.right = '300px';
        }
    }
}


// Function to show a stylish error message with a description
function showErrorMessage(message) {
    const errorToast = document.createElement('div');
    errorToast.style.position = 'fixed';
    errorToast.style.top = '15%';
    errorToast.style.left = '78%';
    errorToast.style.transform = 'translate(-50%, -50%)';
    errorToast.style.padding = '40px 5px';
    errorToast.style.backgroundColor = '#fff';
    errorToast.style.border = 'solid 2px #dc3545';  // Red border
    errorToast.style.borderRadius = '8px';
    errorToast.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';  // Shadow for depth
    errorToast.style.width = '200px';  // Limit width for better readability
    errorToast.style.zIndex = '9999';
    errorToast.style.opacity = '0';
    errorToast.style.transition = 'opacity 0.4s ease-in-out';
    errorToast.style.textAlign = 'center';  // Center text

    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
        <p style="margin: 0; font-size: 18px;">${message}</p>
    `;

    errorToast.appendChild(errorMessage);
    document.body.appendChild(errorToast);

    // Fade in toast
    setTimeout(() => {
        errorToast.style.opacity = '1';
    }, 100);

    // Automatically fade out toast after 3 seconds
    setTimeout(() => {
        errorToast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(errorToast);
        }, 400);
    }, 3000);
}



// Function to transcribe the video
function transcribeVideo(videoUrl) {
    console.log('Transcribing video:', videoUrl); // Log the video URL

    // Send message to transcribe the video
    chrome.runtime.sendMessage({ action: 'transcribe', videoUrl }, (response) => {
        if (response && response.transcript) {
            createTranscriptionPopup(response.transcript);
        } else {
            console.error('Error fetching transcript. Please try again.');
            // Show a stylish error message
            showErrorMessage('Failed to transcribe the video.<br />Please try again later.');
        }

        // Revert button to original pencil icon after response
        const button = document.getElementById('transcription-button');
        if (button) {
            const icon = document.createElement('span');
            icon.innerHTML = '&#128393;';  // Unicode pencil icon
            icon.style.fontSize = '20px';  // Font size for the icon
            button.innerHTML = '';  // Clear current content
            button.appendChild(icon);
        }
    });
}                               

function addTranscriptionButton() {
    let button = document.getElementById('transcription-button');
    if (button) {
        button.style.display = 'flex'; // Ensure the button is displayed
        return;
    }

    button = document.createElement('button');
    button.id = 'transcription-button';
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    button.style.padding = '0';  // Remove padding
    button.style.backgroundColor = '#dc3545';  // Red color
    button.style.color = '#ffffff';  // White text
    button.style.border = 'none';
    button.style.borderRadius = '50%';  // Circular button
    button.style.fontFamily = 'Arial, sans-serif';  // Set font family
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s ease';  // Hover effect
    button.style.width = '39px';  // Width of the button
    button.style.height = '39px';  // Height of the button
    button.style.display = 'flex';  // Use flexbox for centering
    button.style.alignItems = 'center';  // Center icon vertically
    button.style.justifyContent = 'center';

    // Create the icon
    const icon = document.createElement('span');
    icon.innerHTML = '&#128393;';  // Unicode pencil icon
    icon.style.fontSize = '20px';  // Font size for the icon
    button.appendChild(icon);

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#c82333';  // Darker red on hover
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#dc3545';  // Restore original red after hover
    });

    document.body.appendChild(button);

    button.addEventListener('click', () => {
        // Change button to loading state with a GIF
        button.innerHTML = '<img src="' + chrome.runtime.getURL('icons/loading.gif') + '" alt="Loading..." style="width: 20px; height: 20px;">';

        const videoUrl = window.location.href;
        transcribeVideo(videoUrl);
    });

    // Attach event listeners for full-screen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Check initial full-screen state
    handleFullscreenChange();  // Ensure initial state is correctly applied
}



// Initialize and add the transcription button on new videos
function initializeContentScript() {
    console.log('Content script loaded'); // Log script load

    addTranscriptionButton();

    const observer = new MutationObserver(() => {
        addTranscriptionButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

if (!window.hasRun) {
    window.hasRun = true;
    initializeContentScript();
}






