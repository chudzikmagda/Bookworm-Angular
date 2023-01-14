import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	private books$ = new BehaviorSubject<BookData[]>([]);
	private booksToDisplay$ = new Subject<BookData[]>();
	private quoteSummary$ = new Subject<Quote>();
	private quoteSection$ = new Subject<Quote>();

	getBooks(): Observable<BookData[]> {
		return this.books$.asObservable();
	}

	getBooksStateSnapshot(): BookData[] {
		return this.books$.getValue();
	}

	setBooks(books: BookData[]): void {
		return this.books$.next([...books]);
	}

	getBooksToDisplay(): Observable<BookData[]> {
		return this.booksToDisplay$.asObservable();
	}

	setBooksToDisplay(books: BookData[]): void {
		return this.booksToDisplay$.next(books);
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
