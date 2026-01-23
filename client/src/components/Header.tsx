import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">📚 Бібліотека</h1>
                <nav className="space-x-4">
                    <Link to="/">Головна</Link>
                    <Link to="/register">Реєстрація</Link>
                </nav>
            </div>
        </header>
    );
}
