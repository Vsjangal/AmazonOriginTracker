export const isIndianProduct = (originText) => {
  if (!originText) return false;
  return originText.toLowerCase().includes('india');
};

export const createIndicator = (isIndian) => {
  const indicator = document.createElement('div');
  indicator.className = `origin-indicator ${isIndian ? 'indian' : 'foreign'}`;
  indicator.textContent = isIndian ? '🇮🇳 Made in India' : '🌍 Imported Product';
  return indicator;
};