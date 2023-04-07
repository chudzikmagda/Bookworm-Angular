import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BookFormData } from 'src/app/models/models';
import { BookForm } from './models/book-form.models';

@Component({
	selector: 'c-book-form',
	templateUrl: './book-form.component.html',
	styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent {
	@Input() public bookForm: FormGroup<BookForm>;
	@Input() public bookFormTitle: string;
	@Input() public submitButtonCopy: string;
	@Output() public bookSubmit: EventEmitter<BookFormData> = new EventEmitter<BookFormData>();

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
