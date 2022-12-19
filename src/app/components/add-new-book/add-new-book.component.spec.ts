import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Errors } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { DialogComponent } from '../ui-elements/dialog/dialog.component';
import { InputComponent } from '../ui-elements/input/input.component';
import { TextareaComponent } from '../ui-elements/textarea/textarea.component';
import { AddNewBookComponent } from './add-new-book.component';

describe('AddNewBookComponent', () => {
	let component: AddNewBookComponent;
	let fixture: ComponentFixture<AddNewBookComponent>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', [
			'addNewBook',
			'closeDialog',
			'getLastBookId',
		]);

		fakeActionsService.getLastBookId.and.returnValue(of(0));

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

		expect(component.rating?.value).toEqual('9.9');
	});

	it('should return author from form', () => {
		component.addBookForm = filledAddBookForm();

		expect(component.author?.value).toEqual('John Smith');
	});

	it('should reset form values', () => {
		component.addBookForm = filledAddBookForm();

		component.resetForm();

		expect(component.addBookForm.get('author')?.value).toBeNull();
		expect(component.addBookForm.get('cover')?.value).toBeNull();
		expect(component.addBookForm.get('description')?.value).toBeNull();
		expect(component.addBookForm.get('language')?.value).toBeNull();
		expect(component.addBookForm.get('rating')?.value).toBeNull();
		expect(component.addBookForm.get('title')?.value).toBeNull();
	});

	it('should add new book when form is valid', () => {
		const expectedValuesOfNewBook = {
			author: 'John Smith',
			cover: '',
			description: 'Lorem ipsum',
			language: 'English',
			rating: '9.9',
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
			rating: '',
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

		const errorMsg: DebugElement[] = fixture.debugElement.queryAll(
			By.css('.error__message')
		);

		expect(component.addBookForm?.valid).toBeFalse();
		expect(component.addBookForm.get('author')?.touched).toBeTrue();
		expect(component.addBookForm.get('author')?.value).toEqual('');
		expect(component.addBookForm.get('author')?.valid).toBeFalse();
		expect(component.addBookForm.get('language')?.touched).toBeTrue();
		expect(component.addBookForm.get('language')?.value).toEqual('');
		expect(component.addBookForm.get('language')?.valid).toBeFalse();
		expect(component.addBookForm.get('rating')?.touched).toBeTrue();
		expect(component.addBookForm.get('rating')?.value).toEqual('');
		expect(component.addBookForm.get('rating')?.valid).toBeFalse();
		expect(component.addBookForm.get('title')?.touched).toBeTrue();
		expect(component.addBookForm.get('title')?.value).toEqual('');
		expect(component.addBookForm.get('title')?.valid).toBeFalse();
		expect(errorMsg.length).toBe(4);

		errorMsg.forEach(item => {
			expect(item.nativeElement.innerHTML).toContain(
				expectedErrorMsg().required
			);
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

		const errorMsg: DebugElement[] = fixture.debugElement.queryAll(
			By.css('.error__message')
		);

		expect(component.addBookForm?.valid).toBeFalse();
		expect(component.addBookForm.get('author')?.touched).toBeTrue();
		expect(component.addBookForm.get('author')?.valid).toBeFalse();
		expect(component.addBookForm.get('language')?.touched).toBeTrue();
		expect(component.addBookForm.get('language')?.valid).toBeFalse();
		expect(component.addBookForm.get('title')?.touched).toBeTrue();
		expect(component.addBookForm.get('title')?.valid).toBeFalse();
		expect(errorMsg.length).toBe(3);

		errorMsg.forEach(item => {
			expect(item.nativeElement.innerHTML).toContain(
				expectedErrorMsg().minLength
			);
		});
	});
});

const emptyAddBookForm = (): UntypedFormGroup => {
	return new UntypedFormGroup({
		author: new UntypedFormControl(''),
		cover: new UntypedFormControl(''),
		description: new UntypedFormControl(''),
		language: new UntypedFormControl(''),
		rating: new UntypedFormControl(''),
		title: new UntypedFormControl(''),
	});
};

const filledAddBookForm = (): UntypedFormGroup => {
	return new UntypedFormGroup({
		author: new UntypedFormControl('John Smith'),
		cover: new UntypedFormControl(''),
		description: new UntypedFormControl('Lorem ipsum'),
		language: new UntypedFormControl('English'),
		rating: new UntypedFormControl('9.9'),
		title: new UntypedFormControl('Fake title'),
	});
};

const expectedErrorMsg = (): Errors => {
	return {
		required: ' This field is required. ',
		minLength: ' Value is too short. A minimum length is 2. ',
	};
};
