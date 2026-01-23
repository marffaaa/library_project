const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, default: 'user' },
    password: String,
    registered_at: Date
});

module.exports = mongoose.model('User', userSchema);
