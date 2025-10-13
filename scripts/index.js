
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
