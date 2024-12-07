// Constants
const ORIGIN_SELECTORS = [
  '#productDetails_detailBullets_sections1 tr',
  '#detailBulletsWrapper_feature_div li',
  '#prodDetails tr',
  '.detail-bullet-list li'
];

// Utility functions
const findOriginInfo = () => {
  for (const selector of ORIGIN_SELECTORS) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
      const text = element.textContent.toLowerCase();
      if (text.includes('country of origin') || text.includes('manufactured in')) {
        return text;
      }
    }
  }
  return null;
};

const isIndianProduct = (originText) => {
  if (!originText) return false;
  return originText.toLowerCase().includes('india');
};

const createIndicator = (isIndian) => {
  const indicator = document.createElement('div');
  indicator.className = `origin-indicator ${isIndian ? 'indian' : 'foreign'}`;
  indicator.textContent = isIndian ? '🇮🇳 Made in India' : '🌍 Imported Product';
  return indicator;
};

// Main function
const init = () => {
  const originText = findOriginInfo();
  const isIndian = isIndianProduct(originText);
  
  // Remove any existing indicators
  const existingIndicator = document.querySelector('.origin-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }

  // Add new indicator
  const indicator = createIndicator(isIndian);
  const priceElement = document.querySelector('#priceblock_ourprice') || 
                      document.querySelector('.a-price') ||
                      document.querySelector('#price');
                      
  if (priceElement) {
    priceElement.parentElement.appendChild(indicator);
  }
};

// Initialize and handle dynamic page updates
init();

// Re-run on URL changes (for single-page app behavior)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(init, 1000); // Wait for page content to load
  }
}).observe(document, { subtree: true, childList: true });