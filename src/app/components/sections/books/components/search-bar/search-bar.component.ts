import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	inject,
} from '@angular/core';
import {
	FormGroup,
	FormControl,
	NonNullableFormBuilder,
	Validators,
	ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from 'src/app/components/shared/ui-elements/button/button.component';
import { ButtonVariant } from 'src/app/components/shared/ui-elements/button/models/button.models';
import { InputComponent } from 'src/app/components/shared/ui-elements/input/input.component';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrl: './search-bar.component.scss',
	standalone: true,
	imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
	@Input() public books: BookData[] = [];
	@Output() public filteredBook: EventEmitter<string> = new EventEmitter();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;
	public searchForm: FormGroup<{ input: FormControl<string> }>;

	private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

	public ngOnInit(): void {
		this.searchForm = this.createForm();
	}

	public onSearchBtnClick(): void {
		this.filteredBook.emit(this.searchForm.get('input')?.getRawValue());
	}

	private createForm(): FormGroup<{ input: FormControl<string> }> {
		return this.formBuilder.group({
			input: ['', Validators.required],
		});
	}
}
