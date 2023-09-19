import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonVariant } from 'src/app/components/shared/ui-elements/button/models/button.models';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
	@Input() public books: BookData[] = [];
	@Output() public filteredBook: EventEmitter<string> = new EventEmitter();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;
	public searchForm: FormGroup<{ input: FormControl<string> }>;

	constructor(private readonly fb: NonNullableFormBuilder) {}

	public ngOnInit(): void {
		this.searchForm = this.createForm();
	}

	public onSearchBtnClick(): void {
		this.filteredBook.emit(this.searchForm.get('input')?.getRawValue());
	}

	private createForm(): FormGroup<{ input: FormControl<string> }> {
		return this.fb.group({
			input: ['', Validators.required],
		});
	}
}
