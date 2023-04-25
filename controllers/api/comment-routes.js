// Import the required modules and middleware
const router = require('express').Router();
const {User, Post, Comment} = require('../../models'); // User and Post are not used in this module, but might be used in other modules
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', (req, res) => {
  Comment.findAll() // Find all comments
      .then((comments) => res.json(comments)) // Send the comments as a response
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Route to create a comment
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({ // Create a new comment with the provided comment_text, post_id, and user_id
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
        .then((comment) => res.json(comment)) // Send the created comment as a response
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
  }
});

module.exports = router; // Export the router
