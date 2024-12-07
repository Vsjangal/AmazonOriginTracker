// DOM selectors for finding origin information
const ORIGIN_SELECTORS = [
  '#productDetails_detailBullets_sections1 tr',
  '#detailBulletsWrapper_feature_div li',
  '#prodDetails tr',
  '.detail-bullet-list li'
];

const PRICE_SELECTORS = [
  '#priceblock_ourprice',
  '.a-price',
  '#price'
];

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

const findPriceElement = () => {
  for (const selector of PRICE_SELECTORS) {
    const element = document.querySelector(selector);
    if (element) return element;
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

const init = () => {
  const originText = findOriginInfo();
  const isIndian = isIndianProduct(originText);

  const existingIndicator = document.querySelector('.origin-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }

  const indicator = createIndicator(isIndian);
  const priceElement = findPriceElement();
                      
  if (priceElement) {
    priceElement.parentElement.appendChild(indicator);
  }
};

init();

let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(init, 1000);
  }
}).observe(document, { subtree: true, childList: true });
