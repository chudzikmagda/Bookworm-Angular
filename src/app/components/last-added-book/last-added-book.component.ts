import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-last-added-book',
	templateUrl: './last-added-book.component.html',
	styleUrls: ['./last-added-book.component.scss'],
})
export class LastAddedBookComponent implements OnInit, OnDestroy {
	lastAddedBook: BookData;

	private books: BookData[];
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private actionsService: ActionsService) {}

	ngOnInit(): void {
		this.loadLastAddedBook();
	}

	private loadLastAddedBook() {
		this.actionsService
			.getBooks()
			.pipe(
				takeUntil(this.destroy$),
				tap((books: BookData[]) => (this.books = books)),
				tap(() => this.setLastAddedBook(this.books))
			)
			.subscribe();
	}

	private setLastAddedBook(books: BookData[]) {
		if (books.length > 0)
			this.lastAddedBook = this.actionsService.lastAddedBook(books);
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
