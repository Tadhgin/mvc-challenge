// Function to log out the user
async function logout() {
    // Send a POST request to the API to log out the user
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If the response is OK, redirect to the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        // Otherwise, display an error message
        alert(response.statusText);
    }
}

// Add an event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);
