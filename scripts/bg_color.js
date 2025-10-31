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

// Search + Autocomplete + Highlight
$(document).ready(function() {
  const $input = $('#searchInput');
  const $cards = $('.theBestPlaces a'); // every card city
  const $suggestions = $('#suggestions');

  // Search 
  $input.on('keyup', function() {
    const value = $(this).val().toLowerCase();
    $cards.each(function() {
      const cityName = $(this).find('h2').text().toLowerCase();  
      $(this).toggle(cityName.indexOf(value) > -1); // show/hide card
    });

    showSuggestions(value);   // show autocomplete suggestions
    highlightMatches(value);  // highlight matches
  });

  // Autocomplete 
  function showSuggestions(value) {
    $suggestions.empty(); // clear previous suggestions
    if (!value) return;

    const matches = [];
    $cards.each(function() {
      const cityName = $(this).find('h2').text();
      if (cityName.toLowerCase().includes(value.toLowerCase())) {
        matches.push(cityName);  // add to suggestions
      }
    });

    matches.forEach(name => {
      $suggestions.append(`<li>${name}</li>`);
    });

    // click on suggestion to fill input
    $suggestions.find('li').on('click', function() {
      $input.val($(this).text());
      $suggestions.empty();
      $input.trigger('keyup'); // trigger filtering and highlighting
    });
  }

  // Highlight matches
  function highlightMatches(keyword) {
    $('.highlight').each(function() {
      $(this).replaceWith($(this).text()); // remove previous highlights
    });
    if (!keyword) return;

    const regex = new RegExp(`(${keyword})`, 'gi');
    $cards.find('h2, p').each(function() {
      $(this).html($(this).text().replace(regex, '<span class="highlight">$1</span>'));
    });
  }
});

const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  // Проверка сохранённой темы
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

