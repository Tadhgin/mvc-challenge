// Import Sequelize and the connection to the database
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model by extending Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with the table columns and options
Comment.init(
    {
        // Define the id column as an integer, with auto-increment and primary key constraints
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Define the comment_text column as a string, with a minimum length of 1 character
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // Define the user_id column as an integer, with a foreign key constraint to the User model's id column
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        // Define the post_id column as an integer, with a foreign key constraint to the Post model's id column
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        // Pass in the connection to the database and set the table name, column names, and model name to match the conventions used in Sequelize
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

// Export the Comment model
module.exports = Comment;
