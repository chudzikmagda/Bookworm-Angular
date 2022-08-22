import { Injectable } from '@angular/core';
import { BookData, QuoteModel } from 'src/app/models';
import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { Subscription, tap, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ActionsService {
	constructor(
		private apiService: ApiService,
		private stateService: StateService
	) {}

	getBookList(): Subscription {
		return this.apiService
			.getBookData()
			.pipe(tap((books: BookData[]) => this.stateService.setBooks(books)))
			.subscribe();
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

	bestBook(books: BookData[]): BookData {
		const ratings: number[] = books.map(item => item.rating);
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
}
