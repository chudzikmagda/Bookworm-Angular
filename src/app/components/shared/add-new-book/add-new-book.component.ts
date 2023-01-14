import {
	Component,
	OnInit,
	OnDestroy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Errors, BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../ui-elements/dialog/service/dialog.service';
import { AddNewForm } from './models/models';

@Component({
	selector: 'c-add-new-book',
	templateUrl: './add-new-book.component.html',
	styleUrls: ['./add-new-book.component.scss'],
})
export class AddNewBookComponent implements OnInit, OnDestroy {
	@Input() visible = true;
	@Output() visibleChange: EventEmitter<boolean> =
		new EventEmitter<boolean>();

	addBookForm: FormGroup<AddNewForm>;
	errors: Errors = {
		required: 'This field is required.',
		minLength: 'Value is too short. A minimum length is 2.',
	};
	private newBook: BookData;
	private destroy$: Subject<boolean> = new Subject<boolean>();
	private newBookId: number;

	constructor(
		private fb: NonNullableFormBuilder,
		private actionsService: ActionsService,
		private dialogService: DialogService
	) {}

	ngOnInit(): void {
		this.loadForm();
		this.setCurrentDateAndTime();
	}

	addNewBook(): void {
		this.setIdForNewBook();
		if (this.addBookForm.valid) {
			(this.newBook = {
				...this.addBookForm.getRawValue(),
				id: this.newBookId,
				date_add: this.setCurrentDateAndTime(),
			}),
				this.actionsService.addNewBook(this.newBook);
			this.dialogService.closeDialog(this.visible, this.visibleChange);
		}
	}

	get author() {
		return this.addBookForm.get('author');
	}

	get language() {
		return this.addBookForm.get('language');
	}

	get rating() {
		return this.addBookForm.get('rating');
	}

	get title() {
		return this.addBookForm.get('title');
	}

	resetForm(): void {
		this.addBookForm.reset();
	}

	private loadForm(): FormGroup<AddNewForm> {
		return (this.addBookForm = this.fb.group({
			author: ['', [Validators.required, Validators.minLength(2)]],
			cover: [''],
			description: [''],
			language: ['', [Validators.required, Validators.minLength(2)]],
			rating: [0, [Validators.required]],
			title: ['', [Validators.required, Validators.minLength(2)]],
		}));
	}

	private setCurrentDateAndTime(): string {
		return new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	private setIdForNewBook(): Subscription {
		return this.actionsService
			.getLastBookId()
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				(lastBookId: number) => (this.newBookId = lastBookId + 1)
			);
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
