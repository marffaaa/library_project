import { Link } from 'react-router-dom';
import type {IBook} from "../models/IBook.ts";

interface BookCardProps {
    book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
    console.log('book:', book.cover_url);

    return (

        <div className="border rounded-lg shadow p-4 hover:shadow-md transition">
            <img src={book.cover_url} alt={book.title} className="w-full" />
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">Автор: {book.author?.name || 'Невідомо, бо id авторів оновилися'}</p>
            <p className="text-sm text-gray-600">Жанри: {book.genre?.join(', ')}</p>
            <Link to={`/books/${book._id}`} className="text-blue-500 text-sm mt-2 inline-block">Детальніше</Link>
        </div>
    );
}
