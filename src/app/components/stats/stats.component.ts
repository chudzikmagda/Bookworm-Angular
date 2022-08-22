import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BookData } from 'src/app/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';
import { takeUntil, tap } from 'rxjs/operators';

interface BookStats {
	booksLength: number;
	bestBook: BookData;
	lastAddedBook: BookData;
	avgRating: number;
}

@Component({
	selector: 'c-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
	books: BookData[];
	stats: BookStats;
	unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private stateService: StateService,
		private actionsService: ActionsService
	) {}

	ngOnInit() {
		this.stateService
			.getBooks()
			.pipe(
				takeUntil(this.unsubscribe$),
				tap((books: BookData[]) => (this.books = books))
			)
			.subscribe(() => this.setStats(this.books));
	}

	avgRating(books: BookData[]): number {
		const ratings: number[] = books.map(item => item.rating);
		return ratings.reduce((prev, curr) => prev + curr) / books.length;
	}

	setStats(books: BookData[]): any {
		if (books.length > 0) {
			return (this.stats = {
				booksLength: books.length,
				bestBook: this.actionsService.bestBook(books),
				lastAddedBook: this.actionsService.lastAddedBook(books),
				avgRating: this.avgRating(books),
			});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
