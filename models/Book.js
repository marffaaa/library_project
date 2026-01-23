const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author_id: mongoose.Schema.Types.ObjectId,
    publisher_id: mongoose.Schema.Types.ObjectId,
    isbn: String,
    year: Number,
    genre: [String],
    copies_available: Number,
    location: String,
    cover_url: String
});

module.exports = mongoose.model('Book', bookSchema);
