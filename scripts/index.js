
// Task 5: Display Current Date and Time
function updateDateTime() {
  const now = new Date();

  //construct date 
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const formatted = now.toLocaleString('en-US', options);
  document.getElementById('date-time').textContent = formatted;
}

//update date for every second
updateDateTime();
setInterval(updateDateTime, 1000);

function getGreetingForHour(date = new Date()) {
  const h = date.getHours();

  // switch(true) lets us use ranges in cases
  switch (true) {
    case (h >= 5 && h < 12):
      return "Good morning!";
    case (h >= 12 && h < 17):
      return "Good afternoon!";
    case (h >= 17 && h < 22):
      return "Good evening!";
    default:
      return "Good night!";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('greeting');
  if (!el) return;
  const greet = getGreetingForHour();
  el.textContent = greet;
});

function getGreetingForHour(date = new Date()) {
  const h = date.getHours();

  // switch(true) lets us use ranges in cases
  switch (true) {
    case (h >= 5 && h < 12):
      return "Good morning!";
    case (h >= 12 && h < 17):
      return "Good afternoon!";
    case (h >= 17 && h < 22):
      return "Good evening!";
    default:
      return "Good night!";
  }
}

  //update date for every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

// Task 3 - Arrays and Loops (Footer Team List)
// Create array with team
const teamMembers = ["Bayazit", "Arslan", "Daryn"];
const teamContainer = document.getElementById("team-list");

// clear text and insert participants through a loop
teamContainer.textContent = "Team: "; 

teamMembers.forEach((member, index) => {
  // Create span for each guy
  const span = document.createElement("span");
  span.textContent = member;

  if (index < teamMembers.length - 1) {
    span.textContent += ", ";
  }

  teamContainer.appendChild(span);
});
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('greeting');
  if (!el) return;
  const greet = getGreetingForHour();
  el.textContent = greet;
});
