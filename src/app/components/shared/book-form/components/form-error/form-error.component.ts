import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BookFormErrors } from '../../models/book-form.models';

@Component({
	selector: 'c-form-error',
	templateUrl: './form-error.component.html',
	styleUrl: './form-error.component.scss',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
	@Input() public controlName: AbstractControl<string | number, string | number> | null;

	public readonly BOOK_FORM_ERRORS: typeof BookFormErrors = BookFormErrors;
}
