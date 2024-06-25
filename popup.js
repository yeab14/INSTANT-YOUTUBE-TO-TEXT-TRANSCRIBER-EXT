document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('transcription-button');
    
    button.addEventListener('click', () => {
        // Change button to loading state with a GIF
        button.innerHTML = '<img src="' + chrome.runtime.getURL('icons/loading.gif') + '" alt="Loading..." style="width: 20px; height: 20px;">';

        // Get the URL of the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const videoUrl = activeTab.url;
            transcribeVideo(videoUrl);
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#c82333';  // Darker red on hover
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#dc3545';  // Restore original red after hover
    });
    button.innerHTML = '&#128393;';  // Unicode for a watch icon

    // Function to create the transcription popup
    function createTranscriptionPopup(transcript) {
        button.innerHTML = '&#128393;';  // Reset button text/icon
        
        let popup = document.getElementById('transcription-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'transcription-popup';
            popup.classList.add('transcription-popup');
            popup.style.position = 'fixed';
            popup.style.top = '1px';  // Adjusted top position for better visibility
            popup.style.right = '3px';  // Adjusted right position for better alignment
            popup.style.zIndex = '9999';
            popup.style.padding = '10px';  // Added padding for the whole popup
            popup.style.backgroundColor = '#fff';  // Light gray background
            popup.style.border = '2px solid #dc3545';  // Red border
            popup.style.borderRadius = '5px';
            popup.style.width = '418px';  // Increased width for better readability
            popup.style.height = '519px';  // Increased height
            popup.style.overflowY = 'auto';  // Allow vertical scrolling
            popup.style.overflowX = 'hidden';  // Hide horizontal scrollbar
            popup.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';  // Shadow effect
            popup.style.fontFamily = 'Georgia, Times, serif'; // Set font family
            popup.style.color = '#333';  // Text color

            document.body.appendChild(popup);

            // Title bar for the popup
            const titleBar = document.createElement('div');
            titleBar.style.background = 'linear-gradient(to right, #dc3545, #ffffff)';  // Gradient background
            titleBar.style.color = '#fff';  // Black text color
            titleBar.style.width = '370px';  // Increased width for better readability
            titleBar.style.maxHeight = '40px';  // Limit height for a compact title bar
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

            // Container for the buttons inside the title bar
            const buttonContainer = document.createElement('div');
            buttonContainer.style.position = 'absolute';
            buttonContainer.style.top = '15px';
            buttonContainer.style.right = '35px';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.gap = '15px';  // Adjusted gap between buttons
            buttonContainer.style.alignItems = 'center';  // Center align items
            titleBar.appendChild(buttonContainer);

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
                        showToastMessage('Text copied successfully', true); // Success message
                    })
                    .catch(err => {
                        console.error('Unable to copy text: ', err);
                        showToastMessage('Failed to copy text', false); // Error message
                    });
            });

            buttonContainer.appendChild(copyButton);

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
            } else {
                // User has already rated, hide the rate us widget
                rateUsContainer.style.display = 'none';
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

    function showErrorMessage(message) {
        const errorToast = document.createElement('div');
        errorToast.style.position = 'fixed';
        errorToast.style.top = '50%';
        errorToast.style.left = '50%';
        errorToast.style.transform = 'translate(-50%, -50%)';
        errorToast.style.width = '440px'; // Same width as transcription popup
        errorToast.style.height = '540px'; // Same height as transcription popup
        errorToast.style.backgroundColor = '#fff';
        errorToast.style.border = '#dc3545'; // Red border with increased thickness
        errorToast.style.borderRadius = '10px';
        errorToast.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.4)'; // Increased shadow effect
        errorToast.style.fontFamily = 'Arial, sans-serif'; // Stylish font
        errorToast.style.zIndex = '9999';
        errorToast.style.opacity = '0';
        errorToast.style.transition = 'opacity 0.4s ease-in-out';
        errorToast.style.overflow = 'hidden'; // Hide overflow if needed
    
        // Center content vertically and horizontally
        errorToast.style.display = 'flex';
        errorToast.style.alignItems = 'center';
        errorToast.style.justifyContent = 'center';
    
        const errorMessage = document.createElement('div');
        errorMessage.style.textAlign = 'center';
        errorMessage.style.padding = '20px'; // Adjust padding as needed
    
        errorMessage.innerHTML = `
            <p style="margin: 0; font-size: 24px; line-height: 1.5; font-family: 'Georgia', serif; color: #333;">${message}</p>
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

});
