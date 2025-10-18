// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

// Loop through each question and add a click listener
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle the "active" class on the clicked item
    item.classList.toggle('active');
  });
});