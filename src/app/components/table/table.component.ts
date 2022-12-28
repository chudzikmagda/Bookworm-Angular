import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
	currentPage: number = 1;
	books: BookData[] = [];
	booksToDisplay: BookData[] = [];
	booksPerPage: number = 5;
	totalPages: number;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private actionsService: ActionsService,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.loadBookList();
	}

	deleteBook(tableRow: HTMLElement) {
		this.actionsService.deleteBook(+tableRow.id, this.books);
		this.setBooksToDisplay(this.books);
	}

	onPageChange(page: number, change: number = 0) {
		this.currentPage = page + change;
		this.setBooksToDisplay(this.books);
	}

	onSearchBook(books: BookData[]) {
		this.booksToDisplay = books;
	}

	private paginate(
		books: BookData[],
		booksPerPage: number,
		currentPage: number
	): BookData[] {
		return [
			...books
				.slice((currentPage - 1) * booksPerPage)
				.slice(0, booksPerPage),
		];
	}

	private loadBookList() {
		this.actionsService
			.getBooks()
			.pipe(
				tap((books: BookData[]) => {
					this.books = books;
					this.totalPages = this.setTotalPages();
				}),
				tap((books: BookData[]) => this.setBooksToDisplay(books)),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	private setBooksToDisplay(books: BookData[]): void {
		this.booksToDisplay = this.paginate(
			books,
			this.booksPerPage,
			this.currentPage
		);
		this.cdRef.markForCheck();
	}

	private setTotalPages(): number {
		return Math.ceil(this.books.length / this.booksPerPage);
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
