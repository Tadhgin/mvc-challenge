/**
 * Handles the submission of a comment form
 * @param {Event} event - The form submission event
 */
async function commentFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the comment text and post ID from the form
  const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();
  const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // If the comment text is not empty, send a POST request to the API to create the comment
  if (commentText) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          commentText,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If the response is OK, reload the page to display the new comment
      if (response.ok) {
        document.location.reload();
      } else {
        // Otherwise, display an error message
        alert(response.statusText);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create comment');
    }
  }
}

// Add an event listener to the comment form
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
