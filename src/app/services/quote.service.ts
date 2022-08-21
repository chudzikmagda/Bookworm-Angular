import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuoteModel } from '../models';

@Injectable({
	providedIn: 'root',
})
export class QuoteService {
	apiUrl = 'https://api.quotable.io/random?tags=famous-quotes';

	constructor(private http: HttpClient) {}

	getQuote() {
		return this.http.get<QuoteModel>(this.apiUrl);
	}
}
