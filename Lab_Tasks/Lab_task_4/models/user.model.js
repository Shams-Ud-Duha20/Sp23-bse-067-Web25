// This file defines how a 'User' looks in our MongoDB database.

const mongoose = require('mongoose');

// Define the blueprint (schema) for a User
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Every user must have a username
        unique: true,   // Usernames must be unique (no two users can have the same username)
        trim: true      // Remove extra spaces from username
    },
    email: {
        type: String,
        required: true, // Every user must have an email
        unique: true,   // Emails must be unique
        lowercase: true, // Store emails in lowercase (e.g., "EXAMPLE@mail.com" becomes "example@mail.com")
        trim: true
    },
    password: {
        type: String,
        required: true // Every user must have a password (this will be a hashed password)
    },
    isAdmin: { // NEW FIELD: To identify admin users
        type: Boolean,
        default: false // By default, a new user is not an admin
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically record when the user was created
    }
});

// Create a Mongoose Model from the schema. This allows us to interact with the 'users' collection in MongoDB.
const User = mongoose.model('User', UserSchema);

module.exports = User; // Make this User model available to other files
