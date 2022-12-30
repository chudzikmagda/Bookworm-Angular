import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	private books$ = new BehaviorSubject<BookData[]>([]);
	private quoteSummary$ = new BehaviorSubject<Quote>([]);
	private quoteSection$ = new BehaviorSubject<Quote>([]);

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
