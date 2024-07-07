// Listener for first install to open welcome page
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
    } else if (details.reason === 'uninstall') {
      chrome.tabs.create({ url: 'https://aitextgen.net/contact/' });
    }
  });
  
  // Listener for messages from content scripts or popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'transcribe') {
      const videoUrl = message.videoUrl;
      const videoId = extractVideoId(videoUrl);
      if (videoId) {
        console.log('Sending request to transcribe video:', videoUrl); // Log the request to transcribe the video
        fetch(`http://185.124.109.231:9001/transcribe?video_url=${encodeURIComponent(videoUrl)}`)
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
  
  // Function to extract video ID from YouTube URL
  function extractVideoId(url) {
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }
  
  


