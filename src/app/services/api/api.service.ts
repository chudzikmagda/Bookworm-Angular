import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData, QuoteModel } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private apiUrl = 'https://api.quotable.io/random?tags=famous-quotes';

	constructor(private http: HttpClient) {}

	getBookData(): Observable<BookData[]> {
		return this.http.get<BookData[]>('../../assets/store/books-data.json');
	}

	getQuote() {
		return this.http.get<QuoteModel>(this.apiUrl);
	}
}
