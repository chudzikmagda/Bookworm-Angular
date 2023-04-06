import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookForm } from '../book-form/models/models';
import { BookFormService } from '../book-form/services/book-form.service';
import { DialogService } from '../ui-elements/dialog/services/dialog.service';
import { BookFormData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
	selector: 'c-add-new-book',
	templateUrl: './add-new-book.component.html',
	styleUrls: ['./add-new-book.component.scss'],
})
export class AddNewBookComponent implements OnInit, OnDestroy {
	@Input() public visible: boolean = true;
	@Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	public addBookForm: FormGroup<BookForm>;

	private readonly destroy$: Subject<boolean> = new Subject<boolean>();
	private newBookId: number;

	constructor(
		private readonly dialogService: DialogService,
		private readonly bookFormService: BookFormService,
		private readonly actionsService: ActionsService
	) {}

	public ngOnInit(): void {
		this.bookFormInit();
	}

	public addBook(book: BookFormData): void {
		this.setIdForNewBook();

		this.actionsService.addNewBook({
			...book,
			id: this.newBookId,
			date_add: new Date().toLocaleDateString().toString(),
		});
		this.dialogService.closeDialog(this.visible, this.visibleChange);
	}

	private bookFormInit(): void {
		this.addBookForm = this.bookFormService.setBookForm();
	}

	private setIdForNewBook(): Subscription {
		return this.actionsService
			.getLastBookId()
			.pipe(takeUntil(this.destroy$))
			.subscribe((lastBookId: number) => (this.newBookId = lastBookId + 1));
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
