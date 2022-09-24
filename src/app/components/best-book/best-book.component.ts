import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
	selector: 'c-best-book',
	templateUrl: './best-book.component.html',
	styleUrls: ['./best-book.component.scss'],
})
export class BestBookComponent implements OnInit, OnDestroy {
	bestBook: BookData;
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
					this.bestBook = this.actionsService.bestBook(this.books);
				}
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
