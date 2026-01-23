// models/IBook.ts
export interface IBook {
    _id: string;
    title: string;
    author_id: string;
    publisher_id: string;
    isbn: string;
    year: number;
    genre: string[];
    copies_available: number;
    location: string;
    cover_url?: string;
    // ці поля отримаємо окремими запитами
    author?: {
        _id: string;
        name: string;
    };
    publisher?: {
        _id: string;
        name: string;
    };
}


export interface IAuthor {
    _id: string;
    name: string;
    birth_year?: number;
    death_year?: number;
    country?: string;
}

export interface IPublisher {
    _id: string;
    name: string;
    country?: string;
}
