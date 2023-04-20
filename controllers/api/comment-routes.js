// Import the router from Express, the models, and the authentication middleware
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then((comments) => res.json(comments))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to create a comment
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then((comment) => res.json(comment))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Export the router
module.exports = router;
