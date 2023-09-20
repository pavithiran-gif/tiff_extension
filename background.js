chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      const url = details.url.toLowerCase();
      if (url.endsWith('.tiff') || url.endsWith('.tif')) {
        // Block the request
        url = tiffLinks
        return { cancel: true };
      }
    },
    {
      urls: ["<all_urls>"],
      types: ["main_frame", "sub_frame", "object", "xmlhttprequest", "other"],
    },
    ["blocking"]
  );
  
  // Function to convert and display a TIFF file
  function viewTIFF(event) {
    event.preventDefault();
    const tiffLink = event.currentTarget;
    const tiffURL = tiffLink.getAttribute('href');
  
    // Load the TIFF file using tiff.js
    Tiff.load(tiffURL, function(tiff) {
      // Convert the first page of the TIFF to a canvas (e.g., PNG)
      const canvas = tiff.toCanvas();
  
      // Create a new tab to display the converted image
      chrome.tabs.create({ url: canvas.toDataURL() });
    });
  }
  
  // Add a click event listener to all links with the "tiff-link" 
  const tiffLinks = document.querySelectorAll('.tiff-link');
  tiffLinks.forEach(function(link) {
    link.addEventListener('click', viewTIFF);
  });
  