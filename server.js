// Require dependencies
const path = require('path');
const express = require('express');
// const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

// Set up handlebars engine with custom helpers
const hbs = exphbs.create({
  helpers,
});

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Generate a random secret key for session signing
const randomString = crypto.randomBytes(64).toString('hex');
const secret = crypto.randomBytes(16).toString('hex');
console.log(secret);

// Set up session middleware with Sequelize store
const sess = {
  secret: process.env.SESSION_SECRET, // Set session secret from environment variable
  cookie: {}, // Use default cookie settings
  resave: false, // Do not automatically save session on every request
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({
    db: sequelize, // Use the Sequelize instance for session storage
    checkExpirationInterval: 1000 * 60 * 10, // Check for expired sessions every 10 minutes
    expiration: 1000 * 60 * 30, // Sessions expire after 30 minutes of inactivity
  }),
};

// Use session middleware in the app
app.use(session(sess));

// Create Express app
const app = express();

// Set the port number
const PORT = process.env.PORT || 3001;

// Set up handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session middleware and static file serving
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with JSON and urlencoded middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Set up routes
// app.use(routes);

// Sync Sequelize models and start listening for requests
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
