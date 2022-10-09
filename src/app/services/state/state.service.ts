import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookData, QuoteModel } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	private books$ = new BehaviorSubject<BookData[]>([]);
	private quoteSummary$ = new BehaviorSubject<QuoteModel>([]);
	private quoteSection$ = new BehaviorSubject<QuoteModel>([]);

	getBooks(): Observable<BookData[]> {
		return this.books$.asObservable();
	}

	setBooks(books: BookData[]): void {
		return this.books$.next(books);
	}

	getSummaryQuote(): Observable<QuoteModel> {
		return this.quoteSummary$.asObservable();
	}

	setSummaryQuote(quote: QuoteModel): void {
		return this.quoteSummary$.next(quote);
	}

	getSectionQuote(): Observable<QuoteModel> {
		return this.quoteSection$.asObservable();
	}

	setSectionQuote(quote: QuoteModel): void {
		return this.quoteSection$.next(quote);
	}
}
