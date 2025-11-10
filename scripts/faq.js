// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

// Loop through each question and add a click listener
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle the "active" class on the clicked item
    item.classList.toggle('active');
  });
});

//for activate burger
const burger = document.getElementById("burgerMenu");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});