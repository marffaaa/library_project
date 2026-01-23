const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: String,
    country: String
});

module.exports = mongoose.model('Publisher', publisherSchema);
