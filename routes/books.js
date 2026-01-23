const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const books = await Book.aggregate([
            {
                $lookup: {
                    from: 'authors',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'publishers',
                    localField: 'publisher_id',
                    foreignField: '_id',
                    as: 'publisher'
                }
            },
            { $unwind: { path: '$publisher', preserveNullAndEmptyArrays: true } }
        ]);
        res.send(books);
    } catch (err) {
        res.status(500).send('Помилка при отриманні книг');
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Невірний формат id книги');
        }

        const book = await Book.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'publishers',
                    localField: 'publisher_id',
                    foreignField: '_id',
                    as: 'publisher'
                }
            },
            { $unwind: { path: '$publisher', preserveNullAndEmptyArrays: true } }
        ]);
        if (book.length === 0) return res.status(404).send('Книга не знайдена');
        res.send(book[0]);
    } catch (err) {
        res.status(500).send('Помилка при отриманні книги');
    }
});

router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(400).send('Помилка при створенні книги');
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Невірний формат id книги');
        }
        const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).send('Книга не знайдена');
        res.send(updated);
    } catch {
        res.status(400).send('Помилка при оновленні книги');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Невірний формат id книги');
        }
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).send('Книга не знайдена');
        res.send({ message: 'Книгу видалено' });
    } catch {
        res.status(500).send('Помилка при видаленні книги');
    }
});

module.exports = router;
