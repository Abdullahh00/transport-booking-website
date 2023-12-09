const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['admin', 'customer'], // Define allowed user types
        required: true,
    },
    accountbalance:{
        type:Number,
        default:500
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
