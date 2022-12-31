import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-best-book',
	templateUrl: './best-book.component.html',
	styleUrls: ['./best-book.component.scss'],
})
export class BestBookComponent implements OnInit, OnDestroy {
	bestBook: BookData;

	private books: BookData[];
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private actionsService: ActionsService) {}

	ngOnInit(): void {
		this.loadBestBook();
	}

	private loadBestBook(): void {
		this.actionsService
			.getBooks()
			.pipe(
				takeUntil(this.destroy$),
				tap((books: BookData[]) => (this.books = books)),
				tap(() => {
					this.books.length > 0 && this.setBestBook(this.books);
				})
			)
			.subscribe();
	}

	private setBestBook(books: BookData[]): BookData {
		return (this.bestBook = this.actionsService.bestBook(books));
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
