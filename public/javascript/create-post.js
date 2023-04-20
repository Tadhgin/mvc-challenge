// Function to handle the click on the "Create New Post" button
async function createPostHandler(event) {
    event.preventDefault();

    // Redirect to the new post form
    document.location.replace('/dashboard/new')
}

// Add an event listener to the "Create New Post" button
document.querySelector('#create-new-post').addEventListener('click', createPostHandler);
