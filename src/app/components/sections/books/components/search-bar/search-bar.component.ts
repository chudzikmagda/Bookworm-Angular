import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
	FormGroup,
	FormControl,
	NonNullableFormBuilder,
	Validators,
} from '@angular/forms';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
	@Input() books: BookData[] = [];
	@Output() filteredBook: EventEmitter<string> = new EventEmitter();

	searchForm: FormGroup<{ input: FormControl<string> }>;

	constructor(private fb: NonNullableFormBuilder) {}

	ngOnInit(): void {
		this.searchForm = this.createForm();
	}

	onSearchBtnClick(): void {
		const searchValue = this.searchForm.get('input')?.getRawValue();
		this.filteredBook.emit(searchValue);
	}

	private createForm(): FormGroup<{ input: FormControl<string> }> {
		return this.fb.group({
			input: ['', Validators.required],
		});
	}
}
