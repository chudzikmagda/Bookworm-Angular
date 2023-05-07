import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MockComponents } from 'ng-mocks';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { InputComponent } from '../ui-elements/input/input.component';
import { TextareaComponent } from '../ui-elements/textarea/textarea.component';
import { BookFormComponent } from './book-form.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BookForm } from './models/book-form.models';

describe('BookFormComponent', () => {
	let component: BookFormComponent;
	let fixture: ComponentFixture<BookFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				BookFormComponent,
				MockComponents(ButtonComponent, InputComponent, FormErrorComponent, TextareaComponent),
			],
			imports: [ReactiveFormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(BookFormComponent);
		component = fixture.componentInstance;
		component.bookFormTitle = 'Add a new book';
		component.submitButtonCopy = 'Add a new book';
		component.bookForm = bookForm();
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should create form', () => {
		const heading: string = fixture.debugElement.query(By.css('.book-form__heading')).nativeElement
			.innerText;
		const submitButton: string = fixture.debugElement.queryAll(By.directive(ButtonComponent))[1]
			.nativeElement.innerText;
		const form: DebugElement = fixture.debugElement.query(By.css('form'));

		expect(heading).toBe('Add a new book');
		expect(submitButton).toBe('Add a new book');
		expect(form).not.toBeNull();
	});

	it('should emit a bookSubmit event with data when submit button is clicked', () => {
		const spyEventEmitter: jasmine.Spy = spyOn(component.bookSubmit, 'emit');

		component.onBookSubmit();

		expect(spyEventEmitter).toHaveBeenCalledWith(bookForm().value);
	});

	it('should get author', () => {
		expect(component.author?.value).toBe(bookForm().value.author);
	});

	it('should get language', () => {
		expect(component.language?.value).toBe(bookForm().value.language);
	});

	it('should get rating', () => {
		expect(component.rating?.value).toEqual(bookForm().value.rating);
	});

	it('should get title', () => {
		expect(component.title?.value).toEqual(bookForm().value.title);
	});

	it('should reset form', () => {
		component.resetForm();

		expect(component.bookForm.value).not.toEqual(bookForm().value);
	});

	const bookForm = (): FormGroup<BookForm> => {
		return new FormGroup({
			author: new FormControl('fakeAuthor', Validators.required),
			cover: new FormControl('fakeCover'),
			description: new FormControl('fakeDescription'),
			language: new FormControl('fakeLanguage', Validators.required),
			rating: new FormControl(10, Validators.required),
			title: new FormControl('fakeTitle', Validators.required),
		}) as FormGroup<BookForm>;
	};
});
