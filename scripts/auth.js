// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
});

// Modal Functions
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('loginError').textContent = '';
}

function openSignupModal() {
  document.getElementById('signupModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeSignupModal() {
  document.getElementById('signupModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('signupError').textContent = '';
  document.getElementById('signupSuccess').textContent = '';
}

function openProfileModal() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  // Populate profile data
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileJoined').textContent = new Date(currentUser.joinedDate).toLocaleDateString();
  document.getElementById('profileBookings').textContent = `${currentUser.bookings || 0} tours booked`;
  
  document.getElementById('profileModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  document.getElementById('profileModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Switch between modals
function switchToSignup() {
  closeLoginModal();
  setTimeout(openSignupModal, 300);
}

function switchToLogin() {
  closeSignupModal();
  setTimeout(openLoginModal, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  const profileModal = document.getElementById('profileModal');
  
  if (event.target === loginModal) closeLoginModal();
  if (event.target === signupModal) closeSignupModal();
  if (event.target === profileModal) closeProfileModal();
}

// Check Authentication Status
function checkAuthStatus() {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    const user = JSON.parse(currentUser);
    showLoggedInState(user);
  } else {
    showLoggedOutState();
  }
}

// Show Logged In State
function showLoggedInState(user) {
  // Hide login/signup buttons
  document.getElementById('loginNavBtn').style.display = 'none';
  document.getElementById('signupNavBtn').style.display = 'none';
  
  // Show user info and logout
  document.getElementById('userNavInfo').style.display = 'block';
  document.getElementById('logoutNavBtn').style.display = 'block';
  document.getElementById('userNameNav').textContent = `👤 ${user.name}`;
  
  // Update greeting with user name
  updateGreetingWithUser(user.name);
}

// Show Logged Out State
function showLoggedOutState() {
  // Show login/signup buttons
  document.getElementById('loginNavBtn').style.display = 'block';
  document.getElementById('signupNavBtn').style.display = 'block';
  
  // Hide user info and logout
  document.getElementById('userNavInfo').style.display = 'none';
  document.getElementById('logoutNavBtn').style.display = 'none';
  
  // Reset greeting
  updateGreetingWithUser(null);
}

// Update greeting message
function updateGreetingWithUser(userName) {
  const greeting = document.getElementById('greeting');
  if (!greeting) return;
  
  const timeGreeting = getGreetingForHour();
  
  if (userName) {
    greeting.textContent = `${timeGreeting}, ${userName}!`;
  } else {
    greeting.textContent = timeGreeting;
  }
}

// Handle Sign Up
function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupPasswordConfirm').value;
  
  const errorDiv = document.getElementById('signupError');
  const successDiv = document.getElementById('signupSuccess');
  
  // Clear messages
  errorDiv.textContent = '';
  successDiv.textContent = '';
  
  // Validation
  if (password !== confirmPassword) {
    errorDiv.textContent = '❌ Passwords do not match!';
    return;
  }
  
  if (password.length < 6) {
    errorDiv.textContent = '❌ Password must be at least 6 characters!';
    return;
  }
  
  // Check if user already exists
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    errorDiv.textContent = '❌ Email already registered! Please log in.';
    return;
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: btoa(password), // Base64 encoding
    joinedDate: new Date().toISOString(),
    bookings: 0
  };
  
  // Save to localStorage
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Show success
  successDiv.textContent = ' Account created successfully! Redirecting to login...';
  
  // Reset form
  document.getElementById('signupForm').reset();
  
  // Switch to login after 2 seconds
  setTimeout(() => {
    closeSignupModal();
    setTimeout(openLoginModal, 300);
  }, 2000);
}

// Handle Login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  
  const errorDiv = document.getElementById('loginError');
  errorDiv.textContent = '';
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email);
  
  if (!user) {
    errorDiv.textContent = '❌ Account not found! Please sign up.';
    return;
  }
  
  // Check password
  try {
    if (atob(user.password) !== password) {
      errorDiv.textContent = '❌ Incorrect password!';
      return;
    }
  } catch (e) {
    errorDiv.textContent = '❌ Invalid credentials!';
    return;
  }
  
  // Save current user (without password)
  const currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    joinedDate: user.joinedDate,
    bookings: user.bookings || 0
  };
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Close modal and update UI
  closeLoginModal();
  document.getElementById('loginForm').reset();
  
  // Show success
  showLoginSuccess(currentUser);
}

// Show Login Success Animation
function showLoginSuccess(user) {
  checkAuthStatus();
  
  // Show temporary success message
  const successMsg = document.createElement('div');
  successMsg.className = 'toast-notification';
  successMsg.innerHTML = ` Welcome back, ${user.name}!`;
  document.body.appendChild(successMsg);
  
  setTimeout(() => {
    successMsg.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    successMsg.classList.remove('show');
    setTimeout(() => successMsg.remove(), 300);
  }, 3000);
}

// Handle Logout
function handleLogout() {
  if (!confirm('Are you sure you want to log out?')) return;
  
  localStorage.removeItem('currentUser');
  checkAuthStatus();
  
  // Show logout message
  const logoutMsg = document.createElement('div');
  logoutMsg.className = 'toast-notification';
  logoutMsg.innerHTML = ' Logged out successfully!';
  document.body.appendChild(logoutMsg);
  
  setTimeout(() => {
    logoutMsg.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    logoutMsg.classList.remove('show');
    setTimeout(() => logoutMsg.remove(), 300);
  }, 3000);
}

// Delete Account
function deleteAccount() {
  if (!confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone!')) {
    return;
  }
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  // Remove user from users list
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users = users.filter(u => u.id !== currentUser.id);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Remove current user
  localStorage.removeItem('currentUser');
  
  // Close profile modal
  closeProfileModal();
  
  // Update UI
  checkAuthStatus();
  
  // Show deletion message
  const deleteMsg = document.createElement('div');
  deleteMsg.className = 'toast-notification';
  deleteMsg.innerHTML = ' Account deleted successfully';
  document.body.appendChild(deleteMsg);
  
  setTimeout(() => {
    deleteMsg.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    deleteMsg.classList.remove('show');
    setTimeout(() => deleteMsg.remove(), 300);
  }, 3000);
}

