const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    birth_year: Number,
    death_year: Number,
    country: String
});

module.exports = mongoose.model('Author', authorSchema);
