import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	private books$ = new Subject<BookData[]>();
	private quoteSummary$ = new Subject<Quote>();
	private quoteSection$ = new Subject<Quote>();

	getBooks(): Observable<BookData[]> {
		return this.books$.asObservable();
	}

	setBooks(books: BookData[]): void {
		return this.books$.next(books);
	}

	getSummaryQuote(): Observable<Quote> {
		return this.quoteSummary$.asObservable();
	}

	setSummaryQuote(quote: Quote): void {
		return this.quoteSummary$.next(quote);
	}

	getSectionQuote(): Observable<Quote> {
		return this.quoteSection$.asObservable();
	}

	setSectionQuote(quote: Quote): void {
		return this.quoteSection$.next(quote);
	}
}
