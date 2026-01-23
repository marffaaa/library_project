import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBookById, fetchAuthorById, fetchPublisherById } from '../api/api';
import type {IAuthor, IBook, IPublisher} from "../models/IBook.ts";


export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState<IBook | null>(null);
    const [author, setAuthor] = useState<IAuthor | null>(null);
    const [publisher, setPublisher] = useState<IPublisher | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetchBookById(id)
            .then(async (res) => {
                const bookData = res.data;
                setBook(bookData);

                // Паралельно отримуємо автора і видавництво
                const [authorRes, publisherRes] = await Promise.all([
                    fetchAuthorById(bookData.author_id).catch(() => null),
                    fetchPublisherById(bookData.publisher_id).catch(() => null),
                ]);

                setAuthor(authorRes ? authorRes.data : null);
                setPublisher(publisherRes ? publisherRes.data : null);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-4">Завантаження...</div>;
    if (!book) return <div className="p-4">Книга не знайдена</div>;

    return (
        <main className="container mx-auto p-4">
            <img
                width="300"
                src={book.cover_url || "https://img.icons8.com/officel/80/book.png"}
                alt={book.title}
                className="mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p><strong>Автор:</strong> {author ? author.name : 'Невідомо, бо id авторів оновилися'}</p>
            <p><strong>Видавництво:</strong> {publisher ? publisher.name : 'Невідомо'}</p>
            <p><strong>Жанр:</strong> {book.genre?.join(', ') || 'Немає жанру'}</p>
            <p><strong>Рік:</strong> {book.year}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Кількість доступних примірників:</strong> {book.copies_available}</p>
            <p><strong>Місце розташування:</strong> {book.location}</p>
        </main>
    );
}
