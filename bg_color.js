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
