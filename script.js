// Function to load users from localStorage
function loadUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userList = document.getElementById('user-list');
  userList.innerHTML = ''; // Clear the current list

  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.user_name} - ${user.end_date}`;
    userList.appendChild(listItem);
  });
}

// Function to add a new user
document.getElementById('user-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const newUser = {
    user_name: document.getElementById('user_name').value,
    discord_user: document.getElementById('discord_user').value,
    discord_webhook_url: document.getElementById('discord_webhook_url').value,
    mac_address: document.getElementById('mac_address').value,
    end_date: document.getElementById('end_date').value
  };

  // Fetch current users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Add the new user to the list
  users.push(newUser);

  // Save the updated list back to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Reload the list to include the new user
  loadUsers();

  // Reset the form after submission
  document.getElementById('user-form').reset();
});

// Function to update an existing user's end date
document.getElementById('update-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const userNameToUpdate = document.getElementById('update_user_name').value;
  const newEndDate = document.getElementById('update_end_date').value;

  // Fetch current users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userIndex = users.findIndex(user => user.user_name === userNameToUpdate);

  if (userIndex !== -1) {
    users[userIndex].end_date = newEndDate;
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers(); // Reload the user list
  } else {
    alert('User not found!');
  }
});

// Load users when the page is loaded
window.onload = loadUsers;
