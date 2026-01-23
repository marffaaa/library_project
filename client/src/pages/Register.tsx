import { useState } from 'react';
import { registerUser } from '../api/api';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await registerUser(form);
            setMessage('Реєстрація успішна!');
            setForm({ name: '', email: '', password: '' });
        } catch {
            setMessage('Помилка при реєстрації');
        }
    };

    return (
        <main className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-2">Реєстрація</h2>
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
                <input className="border w-full p-2" placeholder="Ім’я" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input className="border w-full p-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input className="border w-full p-2" type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Зареєструватися</button>
                {message && <p>{message}</p>}
            </form>
        </main>
    );
}
