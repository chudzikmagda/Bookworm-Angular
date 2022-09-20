import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { BookData, QuoteModel } from 'src/app/models';
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
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ActionsService implements OnDestroy {
	private books: BookData[];
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private apiService: ApiService,
		private location: Location,
		private route: Router,
		private stateService: StateService
	) {}

	getBookList(destroy$: Subject<boolean>): Observable<BookData[]> {
		return this.apiService.getBookData().pipe(
			takeUntil(destroy$),
			tap((books: BookData[]) => {
				this.stateService.setBooks(books);
			})
		);
	}

	addNewBook(book: BookData): void {
		this.stateService
			.getBooks()
			.pipe(takeUntil(this.destroy$))
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

	getLastBookId(): any {
		return this.stateService
			.getBooks()
			.pipe(map((books: BookData[]) => books.length));
	}

	getQuoteFormApi(): Subscription {
		return this.apiService
			.getQuote()
			.pipe(
				take(1),
				tap((quote: QuoteModel) => this.stateService.setQuote(quote))
			)
			.subscribe();
	}

	openDialog(path: string): void {
		this.route.navigate([path]);
	}

	closeDialog(visible: boolean, visibleChange: EventEmitter<boolean>) {
		visible = false;
		visibleChange.emit(visible);
		this.location.back();
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
