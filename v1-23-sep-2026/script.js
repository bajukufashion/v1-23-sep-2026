const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = '2026';

const colorButtons = [...document.querySelectorAll('[data-color-choice]')];
const productImage = document.querySelector('.detail-main-image');
const selectedColorLabel = document.querySelector('.selected-color');
const productVideo = document.querySelector('.detail-main-video');
const videoChoice = document.querySelector('[data-video-choice]');
const galleryButtons = [...document.querySelectorAll('[data-gallery-image]')];

function selectColor(button) {
  if (!button) return;

  if (selectedColorLabel) selectedColorLabel.textContent = button.dataset.color;
  colorButtons.forEach((option) => {
    const selected = option === button;
    option.classList.toggle('is-selected', selected);
    option.setAttribute('aria-checked', String(selected));
  });

  if (videoChoice) {
    const videoSource = button.dataset.video;
    videoChoice.dataset.video = videoSource || '';
    videoChoice.disabled = !videoSource;
    videoChoice.querySelector('span').textContent = videoSource
      ? `Putar video warna ${button.dataset.color}`
      : 'Video warna ini belum tersedia';
  }
}

function showProductImage(source, alt) {
  if (!productImage) return;
  if (productVideo) {
    productVideo.pause();
    productVideo.removeAttribute('src');
    productVideo.load();
    productVideo.hidden = true;
  }
  productImage.hidden = false;
  productImage.src = source;
  productImage.alt = alt;
}

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const matchingColor = colorButtons.find((option) => option.dataset.color === button.dataset.color);
    selectColor(matchingColor);
    showProductImage(button.dataset.image, button.dataset.alt);
    galleryButtons.forEach((option) => option.classList.toggle('is-selected', option === button));
  });
});

colorButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    selectColor(button);
    showProductImage(button.dataset.image, button.dataset.alt);
    galleryButtons.forEach((option) => option.classList.toggle(
      'is-selected',
      option.dataset.image === button.dataset.image
    ));
  });

  button.addEventListener('keydown', (event) => {
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 :
      ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;

    if (!direction || colorButtons.length < 2) return;

    event.preventDefault();
    const nextIndex = (index + direction + colorButtons.length) % colorButtons.length;
    colorButtons[nextIndex].focus();
    colorButtons[nextIndex].click();
  });
});

if (videoChoice && productVideo) {
  videoChoice.addEventListener('click', () => {
    const source = videoChoice.dataset.video;
    if (!source) return;

    productImage.hidden = true;
    productVideo.hidden = false;
    if (productVideo.getAttribute('src') !== source) {
      productVideo.src = source;
      productVideo.load();
    }
    productVideo.play().catch(() => {
      productVideo.controls = true;
    });
  });
}

const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
