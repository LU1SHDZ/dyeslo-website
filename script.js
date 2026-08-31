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

const productSummary = document.querySelector('.product-summary');
if (productSummary) {
  document.title = "Living Bottle Planter — D'Yeslo";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "Preview a one-of-a-kind reclaimed glass bottle planter handmade by D'Yeslo in Athens, Georgia.";
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) breadcrumb.lastChild.textContent = ' / Living Bottle Planter';
  productSummary.querySelector('h1').innerHTML = 'Living Bottle<br><em>Planter</em>';
  productSummary.querySelector('.price').textContent = 'One of one · Details coming soon';
  productSummary.querySelector('.product-intro').textContent = "A reclaimed bottle transformed into a living vessel—an expressive meeting of glass, greenery, and D'Yeslo's handmade point of view.";
  productSummary.querySelector('.product-options').hidden = true;
  productSummary.querySelector('.shipping-note').textContent = 'See current availability at the Wednesday or Saturday market.';
  const detailCopy = productSummary.querySelectorAll('details p');
  if (detailCopy[0]) detailCopy[0].textContent = "Made by hand in Athens from reclaimed glass. Natural variations and traces of the bottle's former life make every piece unique.";
  if (detailCopy[1]) detailCopy[1].textContent = 'Exact dimensions and plant-care guidance will be listed with each available piece.';
  if (detailCopy[2]) detailCopy[2].textContent = 'Every D\'Yeslo piece extends the useful life of materials that might otherwise be discarded.';
}

const productStory = document.querySelector('.product-story');
if (productStory) {
  productStory.querySelector('h2').innerHTML = 'Once overlooked,<br>now <em>living art.</em>';
  productStory.querySelector(':scope > p').textContent = "This piece begins with recovered glass and becomes part sculpture, part plant home. Its previous life is not erased—it is what gives the finished work its character.";
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
