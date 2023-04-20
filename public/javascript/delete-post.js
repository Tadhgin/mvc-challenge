// Function to handle the click on the "Delete Post" button
async function deleteFormHandler(event) {
    event.preventDefault();

    // Get the ID of the post to delete
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // Send a DELETE request to the API to delete the post
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    // If the response is OK, redirect to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // Otherwise, display an error message
        alert(response.statusText);
    }
}

// Add an event listener to the "Delete Post" button
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
