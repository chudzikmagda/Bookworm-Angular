import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { DialogService } from 'src/app/components/shared/ui-elements/dialog/services/dialog.service';
import { BookData, Errors } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { FormService } from '../../services/form.service';
import { EditBookForm } from './models/models';

@Component({
	selector: 'c-edit-book',
	templateUrl: './edit-book.component.html',
	styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit, OnDestroy {
	@Input() public visible: boolean = true;
	@Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	public editedBook: BookData;
	public editBookForm: FormGroup<EditBookForm>;
	public errors: Errors = {
		required: 'This field is required.',
		minLength: 'Value is too short. A minimum length is 2.',
	};

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(
		private actionsService: ActionsService,
		private dialogService: DialogService,
		private formBuilder: NonNullableFormBuilder,
		private formService: FormService
	) {}

	public ngOnInit(): void {
		this.getEditedBook();
		this.loadForm();
	}

	public get author(): AbstractControl<string, string> | null {
		return this.editBookForm.get('author');
	}

	public get language(): AbstractControl<string, string> | null {
		return this.editBookForm.get('language');
	}

	public get rating(): AbstractControl<number, number> | null {
		return this.editBookForm.get('rating');
	}

	public get title(): AbstractControl<string, string> | null {
		return this.editBookForm.get('title');
	}

	public onFormSave(): void {
		this.actionsService.updateBook({
			...this.editedBook,
			...this.editBookForm.value,
			date_edit: new Date().toLocaleDateString().toString(),
		});
		this.dialogService.closeDialog(this.visible, this.visibleChange);
	}

	public resetForm(): void {
		this.editBookForm.reset();
	}

	public ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	private loadForm(): FormGroup<EditBookForm> {
		return (this.editBookForm = this.formBuilder.group({
			author: [this.editedBook.author, [Validators.required, Validators.minLength(2)]],
			cover: [this.editedBook.cover],
			description: [this.editedBook.description],
			language: [this.editedBook.language, [Validators.required, Validators.minLength(2)]],
			rating: [+this.editedBook.rating, [Validators.required]],
			title: [this.editedBook.title, [Validators.required, Validators.minLength(2)]],
		}));
	}

	private getEditedBook(): void {
		this.formService
			.getEditedBook$()
			.pipe(
				takeUntil(this.onDestroy$),
				tap((books: BookData[]) => {
					this.editedBook = books[0];
				})
			)
			.subscribe();
	}
}
