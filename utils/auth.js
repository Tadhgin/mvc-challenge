// Middleware function to check if a user is authenticated
const withAuth = (req, res, next) => {
    // If user is not authenticated, redirect to login page
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        // If user is authenticated, call the next middleware or route handler
        next();
    }
};

// Export the withAuth middleware function
module.exports = withAuth;
