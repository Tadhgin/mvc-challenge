// Import the required modules and middleware
const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ // Find all posts and include their associated users and comments
      attributes: ['id', 'content', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {model: User, attributes: ['username']},
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {model: User, attributes: ['username']},
        },
      ],
    });
    res.json(dbPostData); // Send the posts as a response
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({ // Find a post by its ID and include its associated user and comments
      where: {id: req.params.id},
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {model: User, attributes: ['username']},
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {model: User, attributes: ['username']},
        },
      ],
    });
    if (!dbPostData) { // If no post is found, send a 404 error response
      res.status(404).json({message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData); // Send the post as a response
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({ // Create a new post with the provided title, content, and user ID
      title: req.body.title,
      content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.json(dbPostData); // Send the created post as a response
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to update an existing post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update( // Update the post's title and content with the provided values
        {title: req.body.title, content: req.body.post_content},
        {where: {id: req.params.id}},
    );
    if (!dbPostData[0]) { // If no post is found, send a 404 error response
      res.status(404).json({message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData); // Send the updated post as a response
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({where: {id: req.params.id}}); // Delete the post with the provided ID
    if (!dbPostData) { // If no post is found, send a 404 error response
      res.status(404).json({message: 'No post found with this id'});
      return;
    }
    res.json(dbPostData); // Send the number of deleted posts as a response
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router; // Export the router
