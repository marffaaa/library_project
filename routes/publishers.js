const express = require('express');
const router = express.Router();
const Publisher = require('../models/Publisher');
const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Невірний формат id видавництва');
    }
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) return res.status(404).send('Видавництво не знайдено');
    res.send(publisher);
});

module.exports = router;
