import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';
import { BookFormComponent } from 'src/app/components/shared/book-form/book-form.component';
import { BookFormService } from 'src/app/components/shared/book-form/services/book-form.service';
import { DialogComponent } from 'src/app/components/shared/ui-elements/dialog/dialog.component';
import { DialogService } from 'src/app/components/shared/ui-elements/dialog/services/dialog.service';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { EditBookComponent } from './edit-book.component';
import { BookData } from 'src/app/models/models';
import { of } from 'rxjs';

describe('EditBookComponent', () => {
	let component: EditBookComponent;
	let fixture: ComponentFixture<EditBookComponent>;
	let fakeDialogService: jasmine.SpyObj<DialogService>;
	let fakeBookFormService: jasmine.SpyObj<BookFormService>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		fakeDialogService = jasmine.createSpyObj('DialogService', ['closeDialog']);
		fakeBookFormService = jasmine.createSpyObj('BookFormService', ['setBookForm', 'getEditedBook$']);
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['updateBook']);

		fakeBookFormService.getEditedBook$.and.returnValue(of(fakeBookList()));

		TestBed.configureTestingModule({
			declarations: [EditBookComponent, MockComponents(DialogComponent, BookFormComponent)],
			imports: [BrowserAnimationsModule, ReactiveFormsModule],
			providers: [
				{
					provide: DialogService,
					useValue: fakeDialogService,
				},
				{
					provide: BookFormService,
					useValue: fakeBookFormService,
				},
				{
					provide: ActionsService,
					useValue: fakeActionsService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(EditBookComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
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
		];
	};
});
