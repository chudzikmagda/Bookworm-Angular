import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { BookData, SectionNames } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnDestroy {
	sectionName: typeof SectionNames = SectionNames;
	booksToDisplay$: Observable<BookData[]>;
	books: BookData[];
	currentPage: number = 1;
	booksPerPage: number = 5;
	totalPages: number;

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private actionsService: ActionsService) {}

	ngOnInit(): void {
		this.booksToDisplay$ = this.actionsService.getBooksToDisplay();
		this.loadData();
	}

	onDeleteBook(tableRow: HTMLElement): void {
		this.actionsService.deleteBook(+tableRow.id, this.books);
	}

	onEditBook(tableRow: BookData): void {
		console.log(tableRow);
	}

	onSearchBook(searchedValue: string): void {
		const filteredBooks = this.filterBooks(searchedValue);
		this.loadBooksToDisplay(filteredBooks);
		this.setTotalPages(filteredBooks);
	}

	onPageChange(page: number, change: number = 0): void {
		this.currentPage = page + change;
		this.actionsService.setBooksToDisplay(
			this.setPagination(this.books, this.booksPerPage, this.currentPage)
		);
	}

	private filterBooks(searchedValue: string): BookData[] {
		return this.books.filter((book: BookData) => {
			return (
				book.author
					.toLowerCase()
					.includes(searchedValue.toLowerCase()) ||
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
		this.actionsService.setBooksToDisplay(
			this.setPagination(books, this.booksPerPage, this.currentPage)
		);
	}

	private setPagination(
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

	private setTotalPages(books: BookData[]): void {
		this.totalPages = Math.ceil(books.length / this.booksPerPage);
	}

	public ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
