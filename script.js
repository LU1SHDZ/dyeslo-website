document.querySelectorAll('.wish').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', saved);
  });
});

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
