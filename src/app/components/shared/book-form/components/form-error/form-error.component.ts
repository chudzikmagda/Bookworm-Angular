import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BookFormErrors } from '../../models/book-form.models';

@Component({
	selector: 'c-form-error',
	templateUrl: './form-error.component.html',
	styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
	@Input() public controlName: AbstractControl<string | number, string | number> | null;

	public errorMessage: typeof BookFormErrors = BookFormErrors;
}
