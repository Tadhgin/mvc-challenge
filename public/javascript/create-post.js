/**
 * Handles the click on the "Create New Post" button
 * @param {Event} event - The click event
 */
async function createPostHandler(event) {
  event.preventDefault();

  // Redirect to the new post form
  document.location.replace('/dashboard/new');
}

// Add an event listener to the "Create New Post" button
document.querySelector('#create-new-post').addEventListener('click', createPostHandler);
