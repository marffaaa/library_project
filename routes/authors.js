const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Невірний формат id автора');
    }
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send('Автора не знайдено');
    res.send(author);
});

module.exports = router;
