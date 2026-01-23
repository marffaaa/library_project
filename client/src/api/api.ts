// api/api.ts
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const fetchBooks = () => axios.get(`${API_BASE}/books`);
export const fetchBookById = (id: string) => axios.get(`${API_BASE}/books/${id}`);
export const registerUser = (data: any) => axios.post(`${API_BASE}/users/register`, data);
export const fetchAuthorById = (id: string) => axios.get(`${API_BASE}/authors/${id}`);
export const fetchPublisherById = (id: string) => axios.get(`${API_BASE}/publishers/${id}`);
