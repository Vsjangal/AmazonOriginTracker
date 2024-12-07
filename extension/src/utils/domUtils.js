import { ORIGIN_SELECTORS, PRICE_SELECTORS } from './selectors.js';

export const findOriginInfo = () => {
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

export const findPriceElement = () => {
  for (const selector of PRICE_SELECTORS) {
    const element = document.querySelector(selector);
    if (element) return element;
  }
  return null;
};