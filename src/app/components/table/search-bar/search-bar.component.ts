import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	UntypedFormBuilder,
	UntypedFormGroup,
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
	@Output() filteredBook: EventEmitter<BookData[]> = new EventEmitter();

	searchForm: UntypedFormGroup;

	constructor(private fb: UntypedFormBuilder) {}

	ngOnInit(): void {
		this.searchForm = this.createForm();
	}

	onSearchBtnClick(): void {
		this.onSearchBook(this.phraseSearch());
	}

	private onSearchBook(books: BookData[]) {
		this.filteredBook.emit(books);
	}

	private phraseSearch(): BookData[] {
		const searchValue = this.searchForm.get('input')?.value;
		return this.books.filter((book: BookData) => {
			return (
				book.author.toLowerCase().includes(searchValue.toLowerCase()) ||
				book.title.toLowerCase().includes(searchValue.toLowerCase())
			);
		});
	}

	private createForm(): UntypedFormGroup {
		return this.fb.group({
			input: ['', Validators.required],
		});
	}
}
