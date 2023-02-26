import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../../shared/ui-elements/dialog/services/dialog.service';
import { PaginationComponent } from '../../shared/ui-elements/pagination/pagination.component';
import { BooksComponent } from './books.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TableComponent } from './components/table/table.component';
import { FormService } from './services/form.service';

describe('BooksComponent', () => {
	let component: BooksComponent;
	let fixture: ComponentFixture<BooksComponent>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;
	let fakeDialogService: jasmine.SpyObj<DialogService>;
	let fakeFormService: jasmine.SpyObj<FormService>;

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', [
			'getBooksToDisplay',
			'deleteBook',
			'setBooksToDisplay',
			'getBooks',
		]);

		fakeActionsService.getBooks.and.returnValue(of(fakeBookList()));
		fakeActionsService.getBooksToDisplay.and.returnValue(
			of(fakeBookList())
		);

		fakeDialogService = jasmine.createSpyObj('DialogService', [
			'openDialog',
		]);

		fakeFormService = jasmine.createSpyObj('FormService', [
			'setEditedBook$',
		]);

		TestBed.configureTestingModule({
			declarations: [
				BooksComponent,
				MockComponents(
					SearchBarComponent,
					TableComponent,
					PaginationComponent
				),
			],
			providers: [
				{
					provide: ActionsService,
					useValue: fakeActionsService,
				},
				{
					provide: DialogService,
					useValue: fakeDialogService,
				},
				{
					provide: FormService,
					useValue: fakeFormService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(BooksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create BooksComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set section name', () => {
		const section: HTMLElement = fixture.debugElement.query(
			By.css('.section--books')
		).nativeElement;

		expect(section.id).toEqual(component.sectionName.BookList);
	});

	it('should get book list on init', () => {
		expect(component.books).toEqual(fakeBookList());
	});

	it('should set books to display on init', () => {
		expect(fakeActionsService.getBooksToDisplay).toHaveBeenCalledTimes(1);
	});

	it('should set total pages for pagination on init', () => {
		expect(component.totalPages).toEqual(2);
	});

	it('should delete book on delete button click', () => {
		const tableRowMock: HTMLElement = document.createElement('div');
		tableRowMock.setAttribute('id', '1');

		component.onDeleteBook(tableRowMock);

		expect(fakeActionsService.deleteBook).toHaveBeenCalled();
		expect(tableRowMock.id).toBe('1');
	});

	it('should edit book on edit button click', () => {
		const idOfEditedBook: number = 1;

		component.onEditBook(idOfEditedBook);

		expect(fakeFormService.setEditedBook$).toHaveBeenCalledOnceWith(
			fakeEditedBook()
		);
		expect(fakeDialogService.openDialog).toHaveBeenCalledOnceWith(
			`edit-book/${idOfEditedBook}`
		);
		expect(component.books.length).toBe(6);
	});

	it('should change page on page change button click in pagination', () => {
		component.onPageChange(1, 1);

		expect(component.currentPage).toBe(2);
		expect(fakeActionsService.setBooksToDisplay).toHaveBeenCalled();
	});

	it('should search for inserted phrase', () => {
		const searchedPhrase: string = 'fakeTitle2';
		const expedtedFilteredBooks: BookData[] = fakeBookList().filter(
			(book: BookData) => book.title.includes(searchedPhrase)
		);

		component.onSearchBook(searchedPhrase);

		expect(component.currentPage).toBe(1);
		expect(component.totalPages).toBe(1);
		expect(fakeActionsService.setBooksToDisplay).toHaveBeenCalledWith(
			expedtedFilteredBooks
		);
		expect(fakeActionsService.getBooksToDisplay).toHaveBeenCalledTimes(1);
	});

	const fakeBookList = (): BookData[] => {
		return [
			{
				id: 1,
				author: 'fakeAuthor',
				title: 'fakeTitle',
				language: 'fakeLang',
				description: 'fakeDescription',
				rating: 10,
				date_add: '10 November 2022',
				cover: 'fakeVover.jpg',
			},
			{
				id: 2,
				author: 'fakeAutho2',
				title: 'fakeTitle2',
				language: 'fakeLang',
				description: 'fakeDescription2',
				rating: 7,
				date_add: '11 November 2022',
				cover: 'fakeVover.jpg',
			},
			{
				id: 3,
				author: 'fakeAutho3',
				title: 'fakeTitle3',
				language: 'fakeLang',
				description: 'fakeDescription3',
				rating: 8,
				date_add: '12 November 2022',
				cover: 'fakeVover.jpg',
			},
			{
				id: 4,
				author: 'fakeAutho4',
				title: 'fakeTitl4',
				language: 'fakeLang',
				description: 'fakeDescriptio4',
				rating: 4,
				date_add: '14 November 2022',
				cover: 'fakeVover.jpg',
			},
			{
				id: 5,
				author: 'fakeAutho5',
				title: 'fakeTitle5',
				language: 'fakeLang',
				description: 'fakeDescription5',
				rating: 4,
				date_add: '19 November 2022',
				cover: 'fakeVover.jpg',
			},
			{
				id: 6,
				author: 'fakeAutho2r',
				title: 'fakeTitle2',
				language: 'fakeLang',
				description: 'fakeDescription2',
				rating: 4,
				date_add: '11 November 2022',
				cover: 'fakeVover.jpg',
			},
		];
	};

	const fakeEditedBook = (): BookData[] => {
		return [
			{
				id: 1,
				author: 'fakeAuthor',
				title: 'fakeTitle',
				language: 'fakeLang',
				description: 'fakeDescription',
				rating: 10,
				date_add: '10 November 2022',
				cover: 'fakeVover.jpg',
			},
		];
	};
});
