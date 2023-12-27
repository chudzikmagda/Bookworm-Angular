import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { BookFormComponent } from 'src/app/components/shared/book-form/book-form.component';
import { BookFormService } from 'src/app/components/shared/book-form/services/book-form.service';
import { DialogComponent } from 'src/app/components/shared/ui-elements/dialog/dialog.component';
import { DialogService } from 'src/app/components/shared/ui-elements/dialog/services/dialog.service';
import { BookData, BookFormData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { EditBookComponent } from './edit-book.component';

describe('EditBookComponent', () => {
	let component: EditBookComponent;
	let fixture: ComponentFixture<EditBookComponent>;
	let fakeBookFormService: jasmine.SpyObj<BookFormService>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;
	let fakeDialogService: jasmine.SpyObj<DialogService>;

	beforeEach(() => {
		fakeBookFormService = jasmine.createSpyObj('BookFormService', ['setBookForm', 'getEditedBook$']);
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['updateBook']);
		fakeDialogService = jasmine.createSpyObj('DialogService', ['closeDialog']);

		fakeBookFormService.getEditedBook$.and.returnValue(of(fakeBookList()));

		TestBed.configureTestingModule({
			declarations: [EditBookComponent, MockComponents(DialogComponent, BookFormComponent)],
			imports: [BrowserAnimationsModule, ReactiveFormsModule],
			providers: [
				DialogService,
				{
					provide: BookFormService,
					useValue: fakeBookFormService,
				},
				{
					provide: ActionsService,
					useValue: fakeActionsService,
				},
				{
					provide: DialogService,
					useValue: fakeDialogService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(EditBookComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should set filled form on component init', () => {
		const bookForm: DebugElement = fixture.debugElement.query(By.directive(BookFormComponent));
		fakeBookFormService.getEditedBook$.and.returnValue(of([fakeEditedBook()]));

		component.ngOnInit();

		expect(fakeBookFormService.setBookForm).toHaveBeenCalledWith(fakeEditedBook());
		expect(bookForm.componentInstance.bookFormTitle).toBe('Edit book');
		expect(bookForm.componentInstance.submitButtonCopy).toBe('Save edited book');
	});

	it('should update edited book', () => {
		const date: Date = new Date('2023-04-01T00:00:00');
		jasmine.clock().mockDate(date);
		fakeBookFormService.getEditedBook$.and.returnValue(of([fakeEditedBook()]));

		component.ngOnInit();
		component.editBook(fakeUpdatedBook());

		expect(fakeActionsService.updateBook).toHaveBeenCalledWith(
			expectedUpdatedBook() as unknown as BookData
		);
		expect(fakeDialogService.closeDialog).toHaveBeenCalledTimes(1);
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
				cover: 'fakeCover.jpg',
			},
			{
				id: 2,
				author: 'fakeAutho2',
				title: 'fakeTitle2',
				language: 'fakeLang',
				description: 'fakeDescription2',
				rating: 7,
				date_add: '11 November 2022',
				cover: 'fakeCover.jpg',
			},
			{
				id: 3,
				author: 'fakeAuthor3',
				title: 'fakeTitle3',
				language: 'fakeLang',
				description: 'fakeDescription3',
				rating: 8,
				date_add: '12 November 2022',
				cover: 'fakeCover.jpg',
			},
		];
	};

	const fakeEditedBook = (): BookData => {
		return {
			id: 3,
			author: 'fakeAuthor3',
			title: 'fakeTitle3',
			language: 'fakeLang',
			description: 'fakeDescription3',
			rating: 8,
			date_add: '12 November 2022',
			cover: 'fakeCover.jpg',
		};
	};

	const fakeUpdatedBook = (): BookFormData => {
		return {
			author: 'fakeUpdatedAuthor3',
			title: 'fakeTitle3',
			language: 'fakeLang',
			description: 'fakeDescription3',
			rating: 8,
			cover: 'fakeCover.jpg',
		};
	};

	const expectedUpdatedBook = (): BookFormData => {
		return { ...fakeEditedBook(), ...fakeUpdatedBook(), date_edit: '01/04/2023' } as BookFormData;
	};
});
