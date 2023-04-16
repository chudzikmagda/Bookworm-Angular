import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MockComponents } from 'ng-mocks';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { InputComponent } from '../ui-elements/input/input.component';
import { TextareaComponent } from '../ui-elements/textarea/textarea.component';
import { BookFormComponent } from './book-form.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

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

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	const bookForm = (): FormGroup => {
		return new FormGroup({
			author: new FormControl('author'),
			cover: new FormControl('cover'),
			description: new FormControl('description'),
			language: new FormControl('language'),
			rating: new FormControl(10),
			title: new FormControl('title'),
		});
	};
});
