import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookFormService } from '../book-form/services/book-form.service';
import { DialogComponent } from '../ui-elements/dialog/dialog.component';
import { DialogService } from '../ui-elements/dialog/services/dialog.service';
import { AddNewBookComponent } from './add-new-book.component';

describe('AddNewBookComponent', () => {
	let component: AddNewBookComponent;
	let fixture: ComponentFixture<AddNewBookComponent>;
	let fakeDialogService: jasmine.SpyObj<DialogService>;
	let fakeBookFormService: jasmine.SpyObj<BookFormService>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		fakeDialogService = jasmine.createSpyObj('DialogService', ['closeDialog']);
		fakeBookFormService = jasmine.createSpyObj('BookFormService', ['setBookForm']);
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['addNewBook', 'getLastBookId']);

		TestBed.configureTestingModule({
			declarations: [AddNewBookComponent, MockComponents(DialogComponent, BookFormComponent)],
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

		fixture = TestBed.createComponent(AddNewBookComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});
});
