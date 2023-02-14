import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, tap, map, Subscription, take } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';

@Injectable({
	providedIn: 'root',
})
export class ActionsService {
	constructor(
		private apiService: ApiService,
		private stateService: StateService,
		private scroller: ViewportScroller
	) {}

	public getBookListFromApi(): Observable<BookData[]> {
		return this.apiService.getBookData().pipe(
			tap((books: BookData[]) => {
				this.stateService.setBooks(books);
			})
		);
	}

	public getBooks(): Observable<BookData[]> {
		return this.stateService.getBooks();
	}

	public getBooksStateSnapshot(): BookData[] {
		return this.stateService.getBooksStateSnapshot();
	}

	public setBooks(books: BookData[]): void {
		return this.stateService.setBooks([...books]);
	}

	public getBooksToDisplay(): Observable<BookData[]> {
		return this.stateService.getBooksToDisplay();
	}

	public setBooksToDisplay(books: BookData[]): void {
		return this.stateService.setBooksToDisplay([...books]);
	}

	public addNewBook(book: BookData): void {
		this.stateService.setBooks([...this.getBooksStateSnapshot(), book]);
	}

	public deleteBook(id: number, books: BookData[]): void {
		return this.stateService.setBooks(
			books.filter((book: BookData) => book.id !== id)
		);
	}

	public updateBook(bookToUpdate: BookData) {
		const updatedBooks = this.stateService
			.getBooksStateSnapshot()
			.map((book: BookData) =>
				book.id === bookToUpdate.id
					? { ...book, ...bookToUpdate }
					: book
			);
		this.stateService.setBooks([...updatedBooks]);
	}

	public getLastBookId(): Observable<number> {
		return this.stateService
			.getBooks()
			.pipe(map((books: BookData[]) => books.length));
	}

	public getSummaryQuoteFormApi(tags: string): Subscription {
		return this.apiService
			.getQuotes(tags)
			.pipe(
				take(1),
				tap((quote: Quote) => this.stateService.setSummaryQuote(quote))
			)
			.subscribe();
	}

	public getSectionQuoteFormApi(tags: string): Subscription {
		return this.apiService
			.getQuotes(tags)
			.pipe(
				take(1),
				tap((quote: Quote) => this.stateService.setSectionQuote(quote))
			)
			.subscribe();
	}

	public scrollToTheId(id: string): void {
		this.scroller.scrollToAnchor(id);
	}
}
