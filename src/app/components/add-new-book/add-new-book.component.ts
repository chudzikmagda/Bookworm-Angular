import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'c-add-new-book',
	templateUrl: './add-new-book.component.html',
	styleUrls: ['./add-new-book.component.scss'],
})
export class AddNewBookComponent implements OnInit {
	addBookForm: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.addBookForm = this.fb.group({
			author: [],
			cover: [],
			description: [],
			language: [],
			rating: [],
			title: [],
		});
	}

	addNewBook() {
		if (this.addBookForm.valid) {
			console.log(this.addBookForm.value);
			this.resetForm();
		}
	}

	resetForm() {
		this.addBookForm.reset({
			author: [],
			cover: [],
			description: [],
			language: [],
			rating: [],
			title: [],
		});
	}
}
