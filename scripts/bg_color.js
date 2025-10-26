(() => {
  const btn = document.getElementById('bgToggle');  // find button
  if (!btn) return;

  const colors = ['#fef3c7','#d1fae5','#e0e7ff','#fde68a','#fce7f3','#e5e7eb','#cffafe','#ede9fe'];
  let i = 0;   // which color is next after click

  const apply = () =>  
    document.documentElement.style.setProperty('--page-bg', colors[i]);  // the function that writes the value of the CSS variable --page-bg

  btn.addEventListener('click', () => {
    apply();                 // change color
    i = (i + 1) % colors.length; // prepairing next color index
  });
})();

// POPUP
(() => {
  const openBtn = document.getElementById('openPopup');  // button to open popup
  const overlay = document.getElementById('popupOverlay');  // popup overlay
  const closeBtn = overlay?.querySelector('.popup-close');  // cross button to close popup
  const cancelBtn = document.getElementById('cancelPopup');  // cancel button to close popup

  if (!openBtn || !overlay) return;  

  const open = () => {  
    overlay.hidden = false;    
    requestAnimationFrame(() => overlay.classList.add('show'));   // smooth animation
    document.body.style.overflow = 'hidden'; // disable scrolling of the page behind
  };

  const close = () => {  // close popup
    overlay.classList.remove('show');  
    overlay.hidden = true;
    document.body.style.overflow = '';
  };

  // open popup
  openBtn.addEventListener('click', open);

  // close popup
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);

  // close by clicking on overlay(not on cross)
  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) close();
  });
})();

// READ MORE toggle
(() => {
  const btn = document.getElementById('readMoreBtn');
  const moreText = document.getElementById('moreText');

  if (!btn || !moreText) return;

  btn.addEventListener('click', () => {
    if (moreText.style.display === 'none' || moreText.style.display === '') {
      moreText.style.display = 'block';
      btn.textContent = 'Read Less';
    } else {
      moreText.style.display = 'none';
      btn.textContent = 'Read More';
    }
  });
})();




