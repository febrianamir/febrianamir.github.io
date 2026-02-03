document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const btn = document.getElementById('header-theme-toggle');
  
  const setTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  const toggle = () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Default to dark mode if no preference saved
    setTheme('dark');
  }

  if (btn) {
    btn.addEventListener('click', toggle);
  }

  // Image zoom/lightbox
  initImageZoom();
});

function initImageZoom() {
  const contentImages = document.querySelectorAll('.content img');
  if (!contentImages.length) return;

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'img-modal';
  modal.innerHTML = `
    <button class="img-modal-close" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <img src="" alt="">
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.img-modal-close');

  const openModal = (src, alt) => {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Wrap each image and add zoom icon
  contentImages.forEach((img) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'content-img-wrapper';
    
    const zoomBtn = document.createElement('span');
    zoomBtn.className = 'content-img-zoom';
    zoomBtn.innerHTML = `
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(zoomBtn);

    const handleOpen = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(img.src, img.alt);
    };
    
    // Stop clicks on wrapper from bubbling to parent anchor
    wrapper.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    
    img.addEventListener('click', handleOpen);
    zoomBtn.addEventListener('click', handleOpen);
  });

  // Close modal events
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
