import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookForm } from '../book-form/models/book-form.models';
import { BookFormService } from '../book-form/services/book-form.service';
import { DialogService } from '../ui-elements/dialog/services/dialog.service';
import { BookFormData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DialogVariant } from '../ui-elements/dialog/models/dialog.models';
import { DialogComponent } from '../ui-elements/dialog/dialog.component';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
	selector: 'c-add-new-book',
	templateUrl: './add-new-book.component.html',
	styleUrl: './add-new-book.component.scss',
	standalone: true,
	imports: [BookFormComponent, DialogComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewBookComponent implements OnInit, OnDestroy {
	public readonly DIALOG_VARIANT: typeof DialogVariant = DialogVariant;
	public addBookForm: FormGroup<BookForm>;

	private newBookId: number;
	private readonly destroy$: Subject<boolean> = new Subject<boolean>();

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
		this.dialogService.closeDialog();
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
