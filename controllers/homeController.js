const db = require('../models');

exports.index = async function(req, res) {
  const posts = await db.Post.findAll({
    include: [
      { model: db.User }
    ],
    order:[
      ['createdAt', 'DESC']
    ]
  });

  res.render('index', { posts });
};


// controllers/authController.js
//const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.signup = function(req, res) {
  res.render('signup');
};

exports.login = function(req, res) {
  res.render('login');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.createAccount = async function(req, res) {
  const { username, password } = req.body;

  try {
    const user = await db.User.create({ username, password });
    req.login(user, (err) => {
      if (err) throw err;
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.error(err);
    res.render('signup', { message: 'Username already exists' });
  }
};

exports.authenticate = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
});

exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.ensureGuest = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/dashboard');
};


// controllers/postController.js
const db = require('../models');

exports.show = async function(req, res) {
  const { id } = req.params;

  try {
    const post = await db.Post.findOne({
      where: { id },
      include: [
        { model: db.User },
        { model: db.Comment, include: [{ model: db.User }] }
      ]
    });
    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.create = async function(req, res) {
  const { title, content } = req.body;

  try {
    const post = await req.user.createPost({ title, content });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
};

exports.updateForm = async function(req, res) {
  const { id } = req.params;

  try {
    const post = await db.Post.findOne({ where: { id } });
    res.render('edit-post', { post });
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
};

exports.update = async function(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await db.Post.findOne({ where: { id } });
    post.title = title;
    post.content = content;
    await post.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
};

exports.delete = async function(req, res) {
  const { id } = req.params;

  try {
    await db.Post.destroy({ where: { id } });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
};

exports.createComment = async function(req, res) {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await req.user.createComment({
      content,
      PostId: id
    });
    res.redirect(`/post/${id}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/post/${id}`);
  }
};