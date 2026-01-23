import { useEffect, useState } from 'react';
import { fetchBooks } from '../api/api';
import BookCard from '../components/BookCard';
import type { IBook } from '../models/IBook';

export default function Home() {
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {
        fetchBooks()
            .then(res => setBooks(res.data))
            .catch(console.error);
    }, []);

    return (
        <main className="container mx-auto px-12 py-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                📚 Каталог книг
            </h1>

            {books.length === 0 ? (
                <p className="text-center text-gray-500">Книг поки немає.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </main>
    );
}
