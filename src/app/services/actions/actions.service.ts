import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { BookData, QuoteModel } from 'src/app/models/models';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import {
	Subscription,
	tap,
	take,
	Observable,
	takeUntil,
	Subject,
	map,
} from 'rxjs';

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

	getBookList(destroy$: Subject<boolean>): Observable<BookData[]> {
		return this.apiService.getBookData().pipe(
			takeUntil(destroy$),
			tap((books: BookData[]) => {
				this.stateService.setBooks(books);
			})
		);
	}

	addNewBook(book: BookData, destroy$: Subject<boolean>): void {
		this.stateService
			.getBooks()
			.pipe(takeUntil(destroy$))
			.subscribe((books: BookData[]) => (this.books = books));
		return this.stateService.setBooks([...this.books, book]);
	}

	deleteBook(id: number, books: BookData[]): void {
		return this.stateService.setBooks(
			books.filter((book: BookData) => book.id !== id)
		);
	}

	bestBook(books: BookData[]): BookData {
		const ratings: number[] = books.map((item: BookData) => item.rating);
		return books[ratings.indexOf(Math.max(...ratings))];
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
				tap((quote: QuoteModel) =>
					this.stateService.setSummaryQuote(quote)
				)
			)
			.subscribe();
	}

	getSectionQuoteFormApi(tags: string): Subscription {
		return this.apiService
			.getQuotes(tags)
			.pipe(
				take(1),
				tap((quote: QuoteModel) =>
					this.stateService.setSectionQuote(quote)
				)
			)
			.subscribe();
	}

	scrollToTheId(id: string): void {
		this.scroller.scrollToAnchor(id);
	}
}
