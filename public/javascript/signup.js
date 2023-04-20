// Function to handle the submission of the signup form
async function signupFormHandler(event) {
    event.preventDefault();

    // Get the username and password from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // If both the username and password are provided, send a POST request to the API to create a new user
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
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

// Add an event listener to the signup form
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
