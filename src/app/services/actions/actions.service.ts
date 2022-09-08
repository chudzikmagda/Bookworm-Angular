import { ElementRef, EventEmitter, Injectable } from '@angular/core';
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
export class ActionsService {
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

	addNewBook(books: BookData[]): void {
		return this.stateService.setBooks(books);
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
}