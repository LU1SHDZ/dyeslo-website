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
  button.innerHTML = "Ask about this piece <span>↗</span>";
  button.addEventListener('click', () => {
    const piece = document.querySelector('.product-summary h1, .drawer-content h2')?.textContent.trim() || "a D'Yeslo piece";
    window.open(`https://wa.me/17067148017?text=${encodeURIComponent(`Hi D'Yeslo, I'm interested in ${piece}. Is it available?`)}`, '_blank', 'noopener');
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
