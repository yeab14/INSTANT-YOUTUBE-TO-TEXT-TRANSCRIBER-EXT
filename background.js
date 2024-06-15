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



