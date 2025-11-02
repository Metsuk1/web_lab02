const countryInfo = {
    name : "Kazakhstan",
    capital : "Astana",
    population : "19 million",
    area : "2.7 million km²",
    showSummary : function(){
    return `${this.name} is the largest landlocked country in the world. 
    Its capital is ${this.capital}, with a population of ${this.population}. 
    The country covers an area of ${this.area}.`; 
       }
};

// Button and text
const showBtn = document.getElementById("show-info-btn");
const aboutText = document.getElementById("about-text");

showBtn.addEventListener("click", () => {
  //If the text is hidden, show it
  if (!aboutText.classList.contains("visible")) {
    aboutText.textContent = countryInfo.showSummary();
    aboutText.classList.add("visible");
    showBtn.textContent = "Hide info";
  } 
  // If the text is already visible, hide it.
  else {
    aboutText.classList.remove("visible");
    showBtn.textContent = "Show info";
  }
});

// Task 3 Higher-Order Functions
const facts = [
  "🇰🇿 Kazakhstan is the 9th largest country in the world.",
  "🌍 It’s the largest landlocked country on Earth.",
  "🚀 The Baikonur Cosmodrome is the world’s first and largest space launch facility.",
  "🐎 Kazakhstan is the birthplace of horse domestication.",
  "🏔 The country has both deserts and snowy mountains."
];

const factsList = document.getElementById("facts-list");

factsList.innerHTML = facts.map(fact => `<li>${fact}</li>`).join("");

// Task 4 play sounds
const clickSound = new Audio("sounds/bell-sound.mp3");
const playBtn = document.getElementById("show-info-btn");

playBtn.addEventListener("click",() => {
    clickSound.play();

    //Task 3 - Animations
     playBtn.style.transform = "scale(1.1)";
     playBtn.style.transition = "transform 0.3s ease";

  // After 300 ms we return to the normal state
  setTimeout(() => {
    playBtn.style.transform = "scale(1)";
  }, 300);

});

//Page Search
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

// reset highlights
function removeHighlights() {
  const highlights = document.querySelectorAll("mark");
  highlights.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  removeHighlights();

  const term = searchInput.value.trim();
  if (term === "") {
    searchResult.textContent = "Please enter a word to search.";
    return;
  }

  
  const bodyText = document.querySelector("main.about");
  const regex = new RegExp(`(${term})`, "gi");
  let matchCount = 0;

  function highlightText(node) {
    if (node.nodeType === 3) { 
      const text = node.textContent;
      if (text.match(regex)) {
        const span = document.createElement("span");
        span.innerHTML = text.replace(regex, "<mark>$1</mark>");
        node.replaceWith(span);
        matchCount++;
      }
    } else if (node.nodeType === 1 && node.childNodes && !["SCRIPT", "STYLE"].includes(node.tagName)) {
      node.childNodes.forEach(highlightText);
    }
  }

  highlightText(bodyText);

  // print result
  if (matchCount > 0) {
    searchResult.textContent = `Found ${matchCount} match(es) for "${term}".`;
  } else {
    searchResult.textContent = `No matches found for "${term}".`;
  }
});

// Responsive menu toggle
const burger = document.getElementById("burgerMenu");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});