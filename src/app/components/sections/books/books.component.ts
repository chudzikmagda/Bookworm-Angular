import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { BookData, EDIT_BOOK_PATH, SectionNames } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../../shared/ui-elements/dialog/services/dialog.service';
import { FormService } from './services/form.service';

@Component({
	selector: 'c-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnDestroy {
	public sectionName: typeof SectionNames = SectionNames;
	public booksToDisplay$: Observable<BookData[]>;
	public books: BookData[];
	public currentPage: number = 1;
	public booksPerPage: number = 5;
	public totalPages: number;

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(
		private actionsService: ActionsService,
		private dialogService: DialogService,
		private formService: FormService
	) {}

	public ngOnInit(): void {
		this.booksToDisplay$ = this.actionsService.getBooksToDisplay();
		this.loadData();
	}

	public onDeleteBook(tableRow: HTMLElement): void {
		this.actionsService.deleteBook(+tableRow.id, this.books);
	}

	public onEditBook(bookId: number): void {
		const editedBook: BookData[] = this.books.filter((book: BookData) => book.id === bookId);
		this.formService.setEditedBook$(editedBook);
		this.openModal(bookId);
	}

	public onSearchBook(searchedValue: string): void {
		const filteredBooks = this.filterBooks(searchedValue);
		this.loadBooksToDisplay(filteredBooks);
		this.setTotalPages(filteredBooks);
	}

	public onPageChange(page: number, change: number = 0): void {
		this.currentPage = page + change;
		this.actionsService.setBooksToDisplay(
			this.setPagination(this.books, this.booksPerPage, this.currentPage)
		);
	}

	private filterBooks(searchedValue: string): BookData[] {
		return this.books.filter((book: BookData) => {
			return (
				book.author.toLowerCase().includes(searchedValue.toLowerCase()) ||
				book.title.toLowerCase().includes(searchedValue.toLowerCase())
			);
		});
	}

	private loadData(): void {
		this.actionsService
			.getBooks()
			.pipe(
				takeUntil(this.onDestroy$),
				tap((books: BookData[]) => {
					this.loadBooksToDisplay(books);
					this.setTotalPages(books);
					this.books = books;
				})
			)
			.subscribe();
	}

	private loadBooksToDisplay(books: BookData[]): void {
		this.actionsService.setBooksToDisplay(this.setPagination(books, this.booksPerPage, this.currentPage));
	}

	private setPagination(books: BookData[], booksPerPage: number, currentPage: number): BookData[] {
		return [...books.slice((currentPage - 1) * booksPerPage).slice(0, booksPerPage)];
	}

	private setTotalPages(books: BookData[]): void {
		this.totalPages = Math.ceil(books.length / this.booksPerPage);
	}

	private openModal(id: number): void {
		this.dialogService.openDialog(`${EDIT_BOOK_PATH}/${id}`);
	}

	public ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
