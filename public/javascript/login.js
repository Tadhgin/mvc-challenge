// Function to handle the submission of the login form
async function loginFormHandler(event) {
  event.preventDefault();

  // Get the username and password from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // If both the username and password are provided, send a POST request to the API to log in the user
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is OK, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // Otherwise, display an error message
      alert(response.statusText);
    }
  }
}

// Add an event listener to the login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
