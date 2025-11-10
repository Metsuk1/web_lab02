const API_URL = 'https://restcountries.com/v3.1/name/kazakhstan';

// Button and text
const showBtn = document.getElementById("show-info-btn");
const aboutText = document.getElementById("about-text");

// Loading state
let isLoading = false;
let cachedData = null;

// Fetch Kazakhstan data from API
async function fetchKazakhstanInfo() {
  try {
    isLoading = true;
    showBtn.textContent = "Loading...";
    showBtn.disabled = true;

    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    const country = data[0]; // Get first result
    
    // Cache the data
    cachedData = {
      name: country.name.common,
      officialName: country.name.official,
      capital: country.capital ? country.capital[0] : 'N/A',
      population: country.population.toLocaleString(),
      area: country.area.toLocaleString() + ' km²',
      region: country.region,
      subregion: country.subregion,
      languages: Object.values(country.languages || {}).join(', '),
      currencies: Object.values(country.currencies || {}).map(c => c.name).join(', '),
      timezones: country.timezones.join(', '),
      borders: country.borders ? country.borders.length : 0,
      flag: country.flag
    };
    
    return cachedData;
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      error: true,
      message: 'Unable to load data. Please try again later.'
    };
  } finally {
    isLoading = false;
    showBtn.disabled = false;
  }
}

// Format the country info for display
function formatCountryInfo(data) {
  if (data.error) {
    return data.message;
  }
  
  return `
    ${data.flag} ${data.officialName}
    
    📍 Capital: ${data.capital}
    👥 Population: ${data.population}
    📏 Area: ${data.area}
    🌍 Region: ${data.region} (${data.subregion})
    💬 Languages: ${data.languages}
    💰 Currency: ${data.currencies}
    🕐 Timezones: ${data.timezones}
    🗺️ Bordering Countries: ${data.borders}
  `;
}

// Button click handler
showBtn.addEventListener("click", async () => {
  // Play sound
  const clickSound = new Audio("sounds/bell-sound.mp3");
  clickSound.play().catch(() => console.log('Sound not available'));
  
  // Animation
  showBtn.style.transform = "scale(1.1)";
  showBtn.style.transition = "transform 0.3s ease";
  setTimeout(() => {
    showBtn.style.transform = "scale(1)";
  }, 300);

  // If text is hidden, show it
  if (!aboutText.classList.contains("visible")) {
    // Use cached data if available, otherwise fetch from API
    const data = cachedData || await fetchKazakhstanInfo();
    
    aboutText.textContent = formatCountryInfo(data);
    aboutText.classList.add("visible");
    showBtn.textContent = "Hide info";
  } 
  // If the text is already visible, hide it
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