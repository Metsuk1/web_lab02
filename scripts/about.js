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