// popup.js

// Function to open a new tab with the TIFF viewer
function openTIFFViewer(tiffURL) {
    // Create a new tab to display the TIFF file
    chrome.tabs.create({ url: tiffURL });
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'openTIFF') {
      // Call the openTIFFViewer function with the TIFF URL
      openTIFFViewer(request.tiffURL);
    }
  });
  
  // You can optionally include other logic or UI elements here as needed.
  