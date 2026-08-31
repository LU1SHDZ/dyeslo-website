const reviewDefaults = {
  hero: { key: 'imported-display', label: 'Imported display', image: 'assets/images/imported/display.png' },
  about: { key: 'imported-yesi', label: 'Yesi portrait', image: 'assets/images/imported/yesi.png' },
  products: [
    { key: 'imported-bag', label: 'Patchwork bag', image: 'assets/images/imported/bag.png' },
    { key: 'imported-bottle', label: 'Suspended bottle', image: 'assets/images/imported/bottle.png' },
    { key: 'imported-lamp', label: 'Botanical lamp', image: 'assets/images/imported/lamp.png' },
    { key: 'imported-muertos', label: 'Los Muertos lamp', image: 'assets/images/imported/los-muertos.png' }
  ]
};

let reviewChoices;
try {
  reviewChoices = JSON.parse(localStorage.getItem('dyeslo-photo-review-v2')) || reviewDefaults;
} catch {
  reviewChoices = reviewDefaults;
}

const choiceLabel = (button) => button.querySelector('strong').textContent;
const choiceData = (button) => ({ key: button.dataset.key, label: choiceLabel(button), image: button.dataset.image });

function renderReview() {
  document.querySelector('[data-preview="hero"]').style.backgroundImage = `url('${reviewChoices.hero.image}')`;
  document.querySelector('[data-preview="about"]').style.backgroundImage = `url('${reviewChoices.about.image}')`;
  document.querySelector('[data-preview="products"]').innerHTML = reviewChoices.products.map((item) => `<figure><img src="${item.image}" alt="${item.label}"><figcaption>${item.label}</figcaption></figure>`).join('');

  document.querySelectorAll('.image-choice').forEach((button) => {
    const group = button.dataset.group;
    const selected = group === 'products'
      ? reviewChoices.products.some((item) => item.key === button.dataset.key)
      : reviewChoices[group].key === button.dataset.key;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });

  document.getElementById('selection-summary').textContent = `Hero: ${reviewChoices.hero.label} · About: ${reviewChoices.about.label} · Products: ${reviewChoices.products.map((item) => item.label).join(', ') || 'None selected'}`;
  localStorage.setItem('dyeslo-photo-review-v2', JSON.stringify(reviewChoices));
}

document.querySelectorAll('.image-choice').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.dataset.group;
    const data = choiceData(button);
    if (group !== 'products') {
      reviewChoices[group] = data;
    } else {
      const index = reviewChoices.products.findIndex((item) => item.key === data.key);
      if (index >= 0) reviewChoices.products.splice(index, 1);
      else if (reviewChoices.products.length < 4) reviewChoices.products.push(data);
    }
    renderReview();
  });
});

renderReview();
