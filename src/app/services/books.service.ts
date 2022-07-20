import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookData {
	id: string;
	author_firstname: string;
	author_lastname: string;
	title: string;
	language: string;
	description: string;
	rating: number;
	date_add: string;
	date_edit: string;
	cover: string;
}
@Injectable({
	providedIn: 'root',
})
export class BookService {
	constructor(private http: HttpClient) {}

	bestBook(books: BookData[]): BookData {
		const ratings: number[] = books.map(item => item.rating);
		return books[ratings.indexOf(Math.max(...ratings))];
	}

	getData(): Observable<BookData[]> {
		return this.http.get<BookData[]>('../../assets/store/books-data.json');
	}

	lastAddedBook(books: BookData[]): BookData {
		const dates: any[] = books.map(item => new Date(item.date_add));
		const lastAddedBook =
			books[
				dates.indexOf(
					dates.reduce((a, b) => {
						return new Date(a.MeasureDate) > new Date(b.MeasureDate)
							? a
							: b;
					})
				)
			];
		return lastAddedBook;
	}
}
