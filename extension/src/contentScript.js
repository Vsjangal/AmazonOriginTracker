import { findOriginInfo, findPriceElement } from './utils/domUtils.js';
import { isIndianProduct, createIndicator } from './utils/originChecker.js';

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
  const priceElement = findPriceElement();
                      
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