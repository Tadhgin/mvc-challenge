const Sequelize = require('sequelize');
require('dotenv').config();

const dbConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
};

if (process.env.JAWSDB_URL) {
  // Use JawsDB if available
  dbConfig.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
  module.exports = new Sequelize(process.env.JAWSDB_URL, dbConfig);
} else {
  // Use local MySQL database
  const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      dbConfig,
  );
  module.exports = sequelize;
}
