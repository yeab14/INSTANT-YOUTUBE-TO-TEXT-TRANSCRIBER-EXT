chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'transcribe') {
        const videoUrl = message.videoUrl;
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
            console.log('Sending request to transcribe video:', videoUrl); // Log the request to transcribe the video
            fetch(`https://youtube-video-to-text-chrome-extension.onrender.com/transcribe?video_url=${encodeURIComponent(videoUrl)}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Received transcript data:', data); // Log the received transcript data
                    sendResponse({ transcript: data.transcript });
                })
                .catch(error => {
                    console.error('Error fetching transcript:', error);
                    sendResponse({ transcript: null });
                });
        } else {
            console.error('Invalid YouTube video URL:', videoUrl);
            sendResponse({ transcript: null });
        }
        return true;  // Keeps the message channel open for sendResponse
    }
});

function extractVideoId(url) {
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
}

// Listener to detect tab updates and URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});

// Optional: Listener for tab activation, if needed
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url.includes('youtube.com/watch')) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
        }
    });
});


