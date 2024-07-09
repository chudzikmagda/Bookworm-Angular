import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private apiUrl: string = 'https://api.quotable.io/random?tags=';
	private http: HttpClient = inject(HttpClient);

	public getBookData(): Observable<BookData[]> {
		return this.http.get<BookData[]>('../../assets/store/books-data.json');
	}

	public getQuotes(tags: string): Observable<Quote> {
		return this.http.get<Quote>(`${this.apiUrl}${tags}`);
	}
}
