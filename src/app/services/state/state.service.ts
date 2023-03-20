import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	private books$: BehaviorSubject<BookData[]> = new BehaviorSubject<BookData[]>([]);
	private booksToDisplay$: Subject<BookData[]> = new Subject<BookData[]>();
	private quoteSummary$: Subject<Quote> = new Subject<Quote>();
	private quoteSection$: Subject<Quote> = new Subject<Quote>();

	public getBooks(): Observable<BookData[]> {
		return this.books$.asObservable();
	}

	public getBooksStateSnapshot(): BookData[] {
		return this.books$.getValue();
	}

	public setBooks(books: BookData[]): void {
		return this.books$.next([...books]);
	}

	public getBooksToDisplay(): Observable<BookData[]> {
		return this.booksToDisplay$.asObservable();
	}

	public setBooksToDisplay(books: BookData[]): void {
		return this.booksToDisplay$.next(books);
	}

	public getSummaryQuote(): Observable<Quote> {
		return this.quoteSummary$.asObservable();
	}

	public setSummaryQuote(quote: Quote): void {
		return this.quoteSummary$.next(quote);
	}

	public getSectionQuote(): Observable<Quote> {
		return this.quoteSection$.asObservable();
	}

	public setSectionQuote(quote: Quote): void {
		return this.quoteSection$.next(quote);
	}
}
