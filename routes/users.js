const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Реєстрація
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, registered_at: new Date() });
        await user.save();
        res.status(201).send({ message: 'Користувача зареєстровано' });
    } catch {
        res.status(400).send('Помилка при реєстрації');
    }
});

// Логін
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Невірний email або пароль');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Невірний email або пароль');
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch {
        res.status(500).send('Помилка авторизації');
    }
});

// Профіль
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Користувача не знайдено');
    res.send(user);
});

module.exports = router;
