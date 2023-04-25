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

// Set up session middleware with Sequelize store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.DB_SECRET, // Set session secret from environment variable
  cookie: {}, // Use default cookie settings
  resave: false, // Do not automatically save session on every request
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({
    db: sequelize, // Use the Sequelize instance
    checkExpirationInterval: 1000 * 60 * 10, // Check for expired sessions every 10 minutes
    expiration: 1000 * 60 * 30, // Sessions expire after 30 minutes
  }),
};

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
