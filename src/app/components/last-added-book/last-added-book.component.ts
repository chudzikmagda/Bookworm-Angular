import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
	selector: 'c-last-added-book',
	templateUrl: './last-added-book.component.html',
	styleUrls: ['./last-added-book.component.scss'],
})
export class LastAddedBookComponent implements OnInit, OnDestroy {
	lastAddedBook: BookData;
	private books: BookData[];
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private apiService: ApiService,
		private actionsService: ActionsService
	) {}

	ngOnInit(): void {
		this.apiService
			.getBookData()
			.pipe(
				takeUntil(this.unsubscribe$),
				tap((books: BookData[]) => (this.books = books))
			)
			.subscribe(() => {
				if (this.books.length > 0) {
					this.lastAddedBook = this.actionsService.lastAddedBook(
						this.books
					);
				}
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
