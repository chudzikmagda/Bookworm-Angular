import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, skip, Subject, takeUntil, tap } from 'rxjs';
import { SectionNames, Quote, BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';
import { BookStats } from './models/models';

@Component({
	selector: 'c-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
	QUOTE_TAG: string = 'famous-quotes';
	sectionName: typeof SectionNames = SectionNames;
	quote$: Observable<Quote | null>;
	bestBook$: Observable<BookData[]>;
	bestBook: BookData;
	stats: BookStats;
	lastAddedBook: BookData;

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(
		private actionsService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	private loadData(): void {
		this.loadQuote();
		this.loadBooks();
	}

	private loadQuote(): void {
		this.actionsService.getSummaryQuoteFormApi(this.QUOTE_TAG);
		this.quote$ = this.stateService.getSummaryQuote();
	}

	private loadBooks(): void {
		this.actionsService
			.getBooks()
			.pipe(
				takeUntil(this.onDestroy$),
				skip(1),
				tap((books: BookData[]) => {
					this.bestBook = this.setBestBook(books);
					this.lastAddedBook = this.setLastAddedBook(books);
					this.stats = this.setStats(books);
				})
			)
			.subscribe();
	}

	private setBestBook(books: BookData[]) {
		return books.reduce((prevBook: BookData, currBook: BookData) =>
			prevBook.rating > currBook.rating ? prevBook : currBook
		);
	}

	private avgRating(books: BookData[]): number {
		const ratings: number[] = books.map((book: BookData) => book.rating);
		return (
			ratings.reduce(
				(prevBookRating: number, currBookRating: number) =>
					prevBookRating + currBookRating
			) / books.length
		);
	}

	private setStats(books: BookData[]): BookStats {
		return {
			booksLength: books.length,
			bestBook: this.bestBook ?? 'Add new book...',
			lastAddedBook: this.lastAddedBook ?? 'Add new book...',
			avgRating: this.avgRating(books) ?? 0,
		};
	}

	private setLastAddedBook(books: BookData[]): BookData {
		return books.reduce((prevBook: BookData, currBook: BookData) =>
			Date.parse(prevBook.date_add) > Date.parse(currBook.date_add)
				? prevBook
				: currBook
		);
	}

	public ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
