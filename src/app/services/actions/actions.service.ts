import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { Subscription, tap, take, Observable, map } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class ActionsService {
	private books: BookData[];

	constructor(
		private apiService: ApiService,
		private stateService: StateService,
		private scroller: ViewportScroller
	) {}

	getBookListFromApi(): Observable<BookData[]> {
		return this.apiService.getBookData().pipe(
			tap((books: BookData[]) => {
				this.stateService.setBooks(books);
			})
		);
	}

	getBooks(): Observable<BookData[]> {
		return this.stateService.getBooks();
	}

	getBooksStateSnapshot(): BookData[] {
		return this.stateService.getBooksStateSnapshot();
	}

	setBooks(books: BookData[]): void {
		return this.stateService.setBooks([...books]);
	}

	getBooksToDisplay(): Observable<BookData[]> {
		return this.stateService.getBooksToDisplay();
	}

	setBooksToDisplay(books: BookData[]): void {
		return this.stateService.setBooksToDisplay([...books]);
	}

	addNewBook(book: BookData): void {
		this.stateService.setBooks([...this.getBooksStateSnapshot(), book]);
	}

	deleteBook(id: number, books: BookData[]): void {
		return this.stateService.setBooks(
			books.filter((book: BookData) => book.id !== id)
		);
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

	getLastBookId(): Observable<number> {
		return this.stateService
			.getBooks()
			.pipe(map((books: BookData[]) => books.length));
	}

	getSummaryQuoteFormApi(tags: string): Subscription {
		return this.apiService
			.getQuotes(tags)
			.pipe(
				take(1),
				tap((quote: Quote) => this.stateService.setSummaryQuote(quote))
			)
			.subscribe();
	}

	getSectionQuoteFormApi(tags: string): Subscription {
		return this.apiService
			.getQuotes(tags)
			.pipe(
				take(1),
				tap((quote: Quote) => this.stateService.setSectionQuote(quote))
			)
			.subscribe();
	}

	scrollToTheId(id: string): void {
		this.scroller.scrollToAnchor(id);
	}
}
