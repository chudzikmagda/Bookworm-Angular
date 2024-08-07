import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookFormData } from 'src/app/models/models';
import { BookForm } from './models/book-form.models';
import { ButtonVariant } from '../ui-elements/button/models/button.models';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { InputComponent } from '../ui-elements/input/input.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { TextareaComponent } from '../ui-elements/textarea/textarea.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'c-book-form',
	templateUrl: './book-form.component.html',
	styleUrl: './book-form.component.scss',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ButtonComponent,
		FormErrorComponent,
		InputComponent,
		TextareaComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent {
	@Input() public bookForm: FormGroup<BookForm>;
	@Input() public bookFormTitle: string;
	@Input() public submitButtonCopy: string;
	@Output() public bookSubmit: EventEmitter<BookFormData> = new EventEmitter<BookFormData>();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;

	public get author(): AbstractControl<string, string> | null {
		return this.bookForm.get('author');
	}

	public get language(): AbstractControl<string, string> | null {
		return this.bookForm.get('language');
	}

	public get rating(): AbstractControl<number, number> | null {
		return this.bookForm.get('rating');
	}

	public get title(): AbstractControl<string, string> | null {
		return this.bookForm.get('title');
	}

	public resetForm(): void {
		this.bookForm.reset();
	}

	public onBookSubmit(): void {
		this.bookSubmit.emit(this.bookForm.getRawValue());
	}
}
