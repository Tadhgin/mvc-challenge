// This function handles the submission of a new post form.
const newFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the title and content of the new post from the form
  const title = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-content"]').value.trim();

  try {
    // Send a POST request to the API to create the new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({title, post_content: postContent}),
      headers: {'Content-Type': 'application/json'},
    });

    // If the request is successful, redirect the user to the dashboard
    if (!response.ok) {
      throw new Error('Failed to create new post');
    }

    document.location.replace('/dashboard');
  } catch (err) {
    // If the request fails, log an error message to the console and display an alert to the user
    console.error(err);
    alert('Failed to create new post');
  }
};

// Add an event listener to the new post form
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
