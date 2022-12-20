import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';
import { BookStats } from './models/models';

@Component({
	selector: 'c-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
	stats: BookStats;
	private books: BookData[];
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private stateService: StateService,
		private actionsService: ActionsService
	) {}

	ngOnInit() {
		this.stateService
			.getBooks()
			.pipe(
				takeUntil(this.unsubscribe$),
				tap((books: BookData[]) => this.setStats(books))
			)
			.subscribe();
	}

	private avgRating(books: BookData[]): number {
		const ratings: number[] = books.map(item => item.rating);
		return ratings.reduce((prev, curr) => prev + curr) / books.length;
	}

	private setStats(books: BookData[]): void {
		if (books.length > 0) {
			this.stats = {
				booksLength: books.length,
				bestBook:
					this.actionsService.bestBook(books) ?? 'Add new book...',
				lastAddedBook:
					this.actionsService.lastAddedBook(books) ??
					'Add new book...',
				avgRating: this.avgRating(books) ?? 0,
			};
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
