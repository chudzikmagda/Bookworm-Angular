import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { BookData, SectionNames } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../../shared/ui-elements/dialog/services/dialog.service';
import { BookFormService } from '../../shared/book-form/services/book-form.service';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/ui-elements/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
	selector: 'c-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss'],
	standalone: true,
	imports: [CommonModule, PaginationComponent, TableComponent, SearchBarComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnDestroy {
	@ViewChild('editBookDialog', { read: ViewContainerRef }) public editBookDialog!: ViewContainerRef;

	public readonly SECTION_NAME: typeof SectionNames = SectionNames;
	public booksToDisplay$: Observable<BookData[]>;
	public books: BookData[];
	public currentPage: number = 1;
	public booksPerPage: number = 5;
	public totalPages: number;

	private readonly onDestroy$: Subject<void> = new Subject<void>();

	constructor(
		private readonly actionsService: ActionsService,
		private readonly dialogService: DialogService,
		private readonly formService: BookFormService
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
		this.openModal();
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

	private openModal(): void {
		this.dialogService.openDialog(this.editBookDialog, EditBookComponent);
	}

	public ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
