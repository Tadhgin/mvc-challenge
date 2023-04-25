/**
 * Handles the submission of the edit post form
 * @param {Event} event - The submit event
 */
async function editFormHandler(event) {
  event.preventDefault();

  // Get the title, content and ID of the post to edit
  const title = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-content"]').value.trim();
  const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // Send a PUT request to the API to update the post with the new title and content
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content: postContent,
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

// Add an event listener to the edit post form
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
