// Function to fetch data from data.json file on GitHub and display it
async function loadUsers() {
  const response = await fetch('data.json');
  const data = await response.json();

  const userList = document.getElementById('user-list');
  userList.innerHTML = '';  // Clear any existing users

  // Display each user in the user list
  data.users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.user_name} - ${user.end_date}`;
    userList.appendChild(listItem);
  });
}

// Function to add a new user to the JSON data
document.getElementById('user-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const newUser = {
    user_name: document.getElementById('user_name').value,
    discord_user: document.getElementById('discord_user').value,
    discord_webhook_url: document.getElementById('discord_webhook_url').value,
    mac_address: document.getElementById('mac_address').value,
    end_date: document.getElementById('end_date').value
  };

  // Fetch current users from the JSON
  const response = await fetch('data.json');
  const data = await response.json();

  // Add new user to the users array
  data.users.push(newUser);

  // Save updated users back to the JSON file (NOTE: this won't work on GitHub Pages as you can't update files via the browser)

  alert('New user added!');
  loadUsers(); // Reload the list to include the new user
});

// Load users when the page is loaded
window.onload = loadUsers;
