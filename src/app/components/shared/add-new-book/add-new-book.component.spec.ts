import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Errors } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { DialogComponent } from '../ui-elements/dialog/dialog.component';
import { DialogService } from '../ui-elements/dialog/services/dialog.service';
import { InputComponent } from '../ui-elements/input/input.component';
import { TextareaComponent } from '../ui-elements/textarea/textarea.component';
import { AddNewBookComponent } from './add-new-book.component';
import { AddNewForm } from './models/models';

describe('AddNewBookComponent', () => {
	let component: AddNewBookComponent;
	let fixture: ComponentFixture<AddNewBookComponent>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;
	let fakeDialogService: jasmine.SpyObj<DialogService>;

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['addNewBook', 'getLastBookId']);

		fakeActionsService.getLastBookId.and.returnValue(of(0));

		fakeDialogService = jasmine.createSpyObj('DialogService', ['closeDialog']);

		TestBed.configureTestingModule({
			declarations: [
				AddNewBookComponent,
				ButtonComponent,
				DialogComponent,
				InputComponent,
				TextareaComponent,
			],
			imports: [BrowserAnimationsModule, ReactiveFormsModule],
			providers: [
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

		fixture = TestBed.createComponent(AddNewBookComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should create empty form on init', () => {
		component.ngOnInit();

		expect(component.addBookForm.value).toEqual(emptyAddBookForm().value);
	});

	it('should return title from form', () => {
		component.addBookForm = filledAddBookForm();

		expect(component.title?.value).toEqual('Fake title');
	});

	it('should return language from form', () => {
		component.addBookForm = filledAddBookForm();

		expect(component.language?.value).toEqual('English');
	});

	it('should return rating from form', () => {
		component.addBookForm = filledAddBookForm();

		expect(component.rating?.value).toEqual(9.9);
	});

	it('should return author from form', () => {
		component.addBookForm = filledAddBookForm();

		expect(component.author?.value).toEqual('John Smith');
	});

	it('should reset form values', () => {
		component.addBookForm.patchValue({
			author: 'author',
			cover: 'cover',
			description: 'description',
			language: 'lang',
			rating: 10,
			title: 'title',
		});
		fixture.detectChanges();

		component.resetForm();
		fixture.detectChanges();

		expect(component.addBookForm.get('author')?.value).toBe('');
		expect(component.addBookForm.get('cover')?.value).toBe('');
		expect(component.addBookForm.get('description')?.value).toBe('');
		expect(component.addBookForm.get('language')?.value).toBe('');
		expect(component.addBookForm.get('rating')?.value).toBe(0);
		expect(component.addBookForm.get('title')?.value).toBe('');
	});

	it('should add new book when form is valid', () => {
		const expectedValuesOfNewBook = {
			author: 'John Smith',
			cover: '',
			description: 'Lorem ipsum',
			language: 'English',
			rating: 9.9,
			title: 'Fake title',
		};
		component.addBookForm = filledAddBookForm();

		component.addNewBook();
		fixture.detectChanges();

		expect(component.addBookForm.valid).toBeTrue();
		expect(component.addBookForm.value).toEqual(expectedValuesOfNewBook);
	});

	it('should not add a new book when form is invalid', () => {
		const expectedValuesOfNewBook = {
			author: '',
			cover: '',
			description: '',
			language: '',
			rating: 0,
			title: '',
		};
		component.ngOnInit();

		component.addNewBook();

		expect(component.addBookForm.valid).toBeFalse();
		expect(component.addBookForm.value).toEqual(expectedValuesOfNewBook);
	});

	it('should display error when author, language, rating and title input is empty', () => {
		component.addBookForm.get('author')?.markAsTouched();
		component.addBookForm.get('language')?.markAsTouched();
		component.addBookForm.get('rating')?.markAsTouched();
		component.addBookForm.get('title')?.markAsTouched();
		fixture.detectChanges();

		const errorMsg: DebugElement[] = fixture.debugElement.queryAll(By.css('.error__message'));

		expect(component.addBookForm?.valid).toBeFalse();
		expect(component.addBookForm.get('author')?.touched).toBeTrue();
		expect(component.addBookForm.get('author')?.value).toEqual('');
		expect(component.addBookForm.get('author')?.valid).toBeFalse();
		expect(component.addBookForm.get('language')?.touched).toBeTrue();
		expect(component.addBookForm.get('language')?.value).toEqual('');
		expect(component.addBookForm.get('language')?.valid).toBeFalse();
		expect(component.addBookForm.get('rating')?.touched).toBeTrue();
		expect(component.addBookForm.get('rating')?.value).toEqual(0);
		expect(component.addBookForm.get('title')?.touched).toBeTrue();
		expect(component.addBookForm.get('title')?.value).toEqual('');
		expect(component.addBookForm.get('title')?.valid).toBeFalse();
		expect(errorMsg.length).toBe(3);

		errorMsg.forEach(item => {
			expect(item.nativeElement.innerHTML).toContain(expectedErrorMsg().required);
		});
	});

	it('should display error when author, language and title length is too short', () => {
		component.addBookForm.get('author')?.patchValue('a');
		component.addBookForm.get('language')?.patchValue('a');
		component.addBookForm.get('title')?.patchValue('a');
		component.addBookForm.get('author')?.markAsTouched();
		component.addBookForm.get('language')?.markAsTouched();
		component.addBookForm.get('title')?.markAsTouched();
		fixture.detectChanges();

		const errorMsg: DebugElement[] = fixture.debugElement.queryAll(By.css('.error__message'));

		expect(component.addBookForm?.valid).toBeFalse();
		expect(component.addBookForm.get('author')?.touched).toBeTrue();
		expect(component.addBookForm.get('author')?.valid).toBeFalse();
		expect(component.addBookForm.get('language')?.touched).toBeTrue();
		expect(component.addBookForm.get('language')?.valid).toBeFalse();
		expect(component.addBookForm.get('title')?.touched).toBeTrue();
		expect(component.addBookForm.get('title')?.valid).toBeFalse();
		expect(errorMsg.length).toBe(3);

		errorMsg.forEach(item => {
			expect(item.nativeElement.innerHTML).toContain(expectedErrorMsg().minLength);
		});
	});
});

const emptyAddBookForm = (): FormGroup<AddNewForm> => {
	return new FormGroup({
		author: new FormControl<string>('', { nonNullable: true }),
		cover: new FormControl<string>('', { nonNullable: true }),
		description: new FormControl<string>('', {
			nonNullable: true,
		}),
		language: new FormControl<string>('', { nonNullable: true }),
		rating: new FormControl<number>(0, { nonNullable: true }),
		title: new FormControl<string>('', { nonNullable: true }),
	});
};

const filledAddBookForm = (): FormGroup<AddNewForm> => {
	return new FormGroup({
		author: new FormControl<string>('John Smith', { nonNullable: true }),
		cover: new FormControl<string>('', { nonNullable: true }),
		description: new FormControl<string>('Lorem ipsum', {
			nonNullable: true,
		}),
		language: new FormControl<string>('English', { nonNullable: true }),
		rating: new FormControl<number>(9.9, { nonNullable: true }),
		title: new FormControl<string>('Fake title', { nonNullable: true }),
	});
};

const expectedErrorMsg = (): Errors => {
	return {
		required: ' This field is required. ',
		minLength: ' Value is too short. A minimum length is 2. ',
	};
};
