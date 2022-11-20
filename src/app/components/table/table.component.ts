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
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
	currentPage: number = 1;
	public books: BookData[] = [];
	public booksToDisplay: BookData[] = [];
	public booksPerPage: number = 5;
	public totalPages: number;
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private actionsService: ActionsService,
		private stateService: StateService,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.loadBookList();
	}

	deleteBook(tableRow: HTMLElement) {
		this.actionsService.deleteBook(+tableRow.id, this.books);
		this.setBooksToDisplay();
	}

	onPageChange(page: number, change: number = 0) {
		this.currentPage = page + change;
		this.setBooksToDisplay();
	}

	private paginate(currentPage: number, booksPerPage: number): BookData[] {
		return [
			...this.books
				.slice((currentPage - 1) * booksPerPage)
				.slice(0, booksPerPage),
		];
	}

	private loadBookList() {
		this.stateService
			.getBooks()
			.pipe(
				tap(books => {
					this.books = books;
					this.totalPages = this.setTotalPages();
				}),
				tap(() => this.setBooksToDisplay()),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	private setBooksToDisplay(): void {
		this.booksToDisplay = this.paginate(
			this.currentPage,
			this.booksPerPage
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
