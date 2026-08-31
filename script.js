const importedProducts = [
  { key: 'bag', name: 'Patchwork Shoulder Bag', type: 'Reclaimed textile · handmade', image: 'assets/images/imported/bag.png' },
  { key: 'bottle', name: 'Suspended Bottle Planter', type: 'Reclaimed glass · living art', image: 'assets/images/imported/bottle.png' },
  { key: 'lamp', name: 'Botanical Bottle Lamp', type: 'Reclaimed glass · functional art', image: 'assets/images/imported/lamp.png' },
  { key: 'muertos', name: 'Los Muertos Lamp', type: 'Illustrated bottle · functional art', image: 'assets/images/imported/los-muertos.png' },
];

document.querySelectorAll('.listing .product-card').forEach((card, index) => {
  const product = importedProducts[index % importedProducts.length];
  const link = card.querySelector('a');
  const image = card.querySelector('.product-image');
  if (link) link.href = `product.html?piece=${product.key}`;
  if (image) image.style.backgroundImage = `url("${product.image}")`;
  card.querySelector('h3').textContent = product.name;
  card.querySelector('.product-info p').textContent = product.type;
});

document.querySelectorAll('.wish').forEach((button) => {
  const productName = button.closest('.product-card')?.querySelector('h3')?.textContent || 'this piece';
  button.setAttribute('aria-label', `Save ${productName} to your wishlist`);
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', saved);
  });
});

document.querySelectorAll('.product-image').forEach((image) => {
  const productName = image.closest('.product-card')?.querySelector('h3')?.textContent;
  if (productName && !image.hasAttribute('role')) {
    image.setAttribute('role', 'img');
    image.setAttribute('aria-label', `${productName}, handmade by D'Yeslo`);
  }
});

document.querySelectorAll('.product-info strong').forEach((price) => {
  if (price.textContent.trim().startsWith('$')) price.textContent = 'Details soon';
});

const productCatalog = {
  bag: {
    name: 'Patchwork Shoulder Bag',
    heading: 'Patchwork<br><em>Shoulder Bag</em>',
    image: 'assets/images/imported/bag.png',
    intro: "Reclaimed denim and textiles become a one-of-a-kind everyday bag—useful, expressive, and unmistakably D'Yeslo.",
    details: "Pieced and sewn by hand in Athens from reclaimed textiles. Every patch, seam, and variation is part of the bag's individual character.",
    storyHeading: 'Once worn,<br>now <em>carried forward.</em>',
    story: 'Instead of letting good fabric disappear into the waste stream, Yesi composes remnants into a practical piece with a completely new personality.',
  },
  bottle: {
    name: 'Suspended Bottle Planter',
    heading: 'Suspended Bottle<br><em>Planter</em>',
    image: 'assets/images/imported/bottle.png',
    intro: "A reclaimed bottle, air plant, and sculptural chain become a hanging garden with D'Yeslo's playful handmade point of view.",
    details: "Assembled by hand in Athens from reclaimed glass and found materials. Natural variations make every suspended piece unique.",
    storyHeading: 'Once overlooked,<br>now <em>living art.</em>',
    story: 'This piece begins with recovered glass and becomes part sculpture, part plant home. Its previous life is not erased—it gives the finished work its character.',
  },
  lamp: {
    name: 'Botanical Bottle Lamp',
    heading: 'Botanical<br><em>Bottle Lamp</em>',
    image: 'assets/images/imported/lamp.png',
    intro: 'A warm, functional light shaped from reclaimed glass and preserved botanicals—artful by day and softly luminous after dark.',
    details: 'Built and finished by hand in Athens using a reclaimed bottle, botanical elements, and lighting components selected for the individual design.',
    storyHeading: 'Once a bottle,<br>now <em>a little atmosphere.</em>',
    story: 'Glass that once held something temporary becomes a lasting source of warmth. Botanical details make this functional object feel like a small illuminated garden.',
  },
  muertos: {
    name: 'Los Muertos Lamp',
    heading: 'Los Muertos<br><em>Bottle Lamp</em>',
    image: 'assets/images/imported/los-muertos.png',
    intro: 'An illustrated reclaimed bottle becomes a glowing seasonal artwork—bold, joyful, and made to be seen from every angle.',
    details: 'Illustrated and assembled by hand in Athens. The recovered bottle retains small variations from its previous life, making the finished lamp one of a kind.',
    storyHeading: 'A vivid tribute,<br>made to <em>glow again.</em>',
    story: 'Color, character, and reclaimed glass meet in a functional artwork that celebrates transformation—the central idea behind every D’Yeslo creation.',
  },
};

const productSummary = document.querySelector('.product-summary');
if (productSummary) {
  const productKey = new URLSearchParams(window.location.search).get('piece') || 'bottle';
  const product = productCatalog[productKey] || productCatalog.bottle;
  document.title = `${product.name} — D'Yeslo`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `Preview ${product.name}, a one-of-a-kind piece handmade by D'Yeslo in Athens, Georgia.`;
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) breadcrumb.lastChild.textContent = ` / ${product.name}`;
  productSummary.querySelector('h1').innerHTML = product.heading;
  productSummary.querySelector('.price').textContent = 'One of one · Details coming soon';
  productSummary.querySelector('.product-intro').textContent = product.intro;
  productSummary.querySelector('.product-options').hidden = true;
  productSummary.querySelector('.shipping-note').textContent = 'See current availability at the Wednesday or Saturday market.';
  const mainImage = document.querySelector('.product-main');
  if (mainImage) {
    mainImage.style.backgroundImage = `url("${product.image}")`;
    mainImage.setAttribute('role', 'img');
    mainImage.setAttribute('aria-label', `${product.name}, handmade by D'Yeslo`);
  }
  const detailCopy = productSummary.querySelectorAll('details p');
  if (detailCopy[0]) detailCopy[0].textContent = product.details;
  if (detailCopy[1]) detailCopy[1].textContent = 'Exact dimensions and care guidance will be added when this individual piece becomes available.';
  if (detailCopy[2]) detailCopy[2].textContent = 'Every D\'Yeslo piece extends the useful life of materials that might otherwise be discarded.';
  const productStory = document.querySelector('.product-story');
  if (productStory) {
    productStory.querySelector('h2').innerHTML = product.storyHeading;
    productStory.querySelector(':scope > p').textContent = product.story;
  }
}

document.querySelectorAll('footer span').forEach((text) => {
  if (text.textContent.includes('Hudson Valley')) text.textContent = 'Handmade in Athens, GA';
});

const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');
const mainNav = document.querySelector('.desktop-nav');
if (mainNav && !mainNav.querySelector('a[href="locations.html"]')) {
  const findUsLink = document.createElement('a');
  findUsLink.href = 'locations.html';
  findUsLink.textContent = 'Find us';
  mainNav.insertBefore(findUsLink, mainNav.children[1] || null);
}
menuToggle?.setAttribute('aria-expanded', 'false');
menuToggle?.addEventListener('click', () => {
  const open = siteHeader.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteHeader?.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.add-cart').forEach((button) => {
  button.innerHTML = "Ask on Instagram <span>↗</span>";
  button.addEventListener('click', () => {
    window.open('https://www.instagram.com/d_yeslo/', '_blank', 'noopener');
  });
});

const socialRail = document.createElement('nav');
socialRail.className = 'social-rail';
socialRail.setAttribute('aria-label', "D'Yeslo social media");
socialRail.innerHTML = `
  <a href="https://www.instagram.com/d_yeslo/" target="_blank" rel="noopener" aria-label="D'Yeslo on Instagram">IG</a>
  <a href="https://www.tiktok.com/@d_yeslo" target="_blank" rel="noopener" aria-label="D'Yeslo on TikTok">TT</a>
  <a href="https://www.youtube.com/@Dyeslo" target="_blank" rel="noopener" aria-label="D'Yeslo on YouTube">YT</a>
  <a href="https://beacons.ai/dyeslo" target="_blank" rel="noopener" aria-label="All D'Yeslo links">+</a>`;
document.body.appendChild(socialRail);

document.querySelector('.drawer-scrim')?.addEventListener('click', () => {
  history.pushState('', document.title, window.location.pathname + window.location.search);
});

document.querySelector('.drawer-close')?.addEventListener('click', () => {
  history.pushState('', document.title, window.location.pathname + window.location.search);
});

document.querySelector('.newsletter form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  input.value = '';
  input.placeholder = 'Thank you — you’re on the list.';
});
