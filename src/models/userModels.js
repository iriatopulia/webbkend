// Assuming you're using MongoDB with Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    // Other user-related fields can be added here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
