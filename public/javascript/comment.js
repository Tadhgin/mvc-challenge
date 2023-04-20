// This function handles the submission of a comment form.
async function commentFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the comment text and post ID from the form
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // If the comment text is not empty, send a POST request to the API to create the comment
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If the response is OK, reload the page to display the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            // Otherwise, display an error message
            alert(response.statusText);
        }
    }
}

// Add an event listener to the comment form
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
