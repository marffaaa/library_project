const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Імпортуємо функцію підключення до БД
const connectDB = require('./db');

// Імпортуємо маршрути
app.use('/authors', require('./routes/authors'));
app.use('/publishers', require('./routes/publishers'));
app.use('/users', require('./routes/users'));
app.use('/books', require('./routes/books'));

const PORT = process.env.PORT || 3000;

// Підключаємось до MongoDB і запускаємо сервер
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to DB', err);
        process.exit(1);
    });
