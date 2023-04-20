// Function to handle the submission of the edit post form
async function editFormHandler(event) {
    event.preventDefault();

    // Get the title, content and ID of the post to edit
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // Send a PUT request to the API to update the post with the new title and content
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
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

// Add an event listener to the edit post form
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
