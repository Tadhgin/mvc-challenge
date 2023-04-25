// config/config.json
const dbConfig = {
  username: 'your_database_username',
  password: 'your_database_password',
  database: 'your_database_name',
  host: '127.0.0.1',
  dialect: 'mysql',
};

// Export the database configuration for different environments
module.exports = {
  development: dbConfig, // Development environment
  test: dbConfig, // Test environment
  production: dbConfig, // Production environment
};

// ESLint configuration
const eslintConfig = {
  rules: {
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
