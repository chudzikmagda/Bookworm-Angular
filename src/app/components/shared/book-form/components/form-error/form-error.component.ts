import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BookFormErrors } from '../../models/book-form.models';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'c-form-error',
	templateUrl: './form-error.component.html',
	styleUrls: ['./form-error.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
	@Input() public controlName: AbstractControl<string | number, string | number> | null;

	public readonly BOOK_FORM_ERRORS: typeof BookFormErrors = BookFormErrors;
}
