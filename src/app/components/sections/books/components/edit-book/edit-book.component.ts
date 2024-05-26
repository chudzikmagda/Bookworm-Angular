import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { DialogService } from 'src/app/components/shared/ui-elements/dialog/services/dialog.service';
import { BookData, BookFormData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { BookForm } from 'src/app/components/shared/book-form/models/book-form.models';
import { BookFormService } from 'src/app/components/shared/book-form/services/book-form.service';
import { DialogVariant } from 'src/app/components/shared/ui-elements/dialog/models/dialog.models';
import { BookFormComponent } from 'src/app/components/shared/book-form/book-form.component';
import { DialogComponent } from 'src/app/components/shared/ui-elements/dialog/dialog.component';

@Component({
	selector: 'c-edit-book',
	templateUrl: './edit-book.component.html',
	styleUrl: './edit-book.component.scss',
	standalone: true,
	imports: [ReactiveFormsModule, BookFormComponent, DialogComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBookComponent implements OnInit, OnDestroy {
	public readonly DIALOG_VARIANT: typeof DialogVariant = DialogVariant;
	public editBookForm: FormGroup<BookForm>;

	private readonly destroy$: Subject<boolean> = new Subject<boolean>();
	private editedBook: BookData;

	constructor(
		private readonly dialogService: DialogService,
		private readonly bookFormService: BookFormService,
		private readonly actionsService: ActionsService
	) {}

	public ngOnInit(): void {
		this.bookFormInit();
	}

	public editBook(book: BookFormData): void {
		this.actionsService.updateBook({
			...this.editedBook,
			...book,
			date_edit: new Date().toLocaleDateString().toString(),
		});
		this.dialogService.closeDialog();
	}

	private bookFormInit(): void {
		this.getEditedBook();
		this.editBookForm = this.bookFormService.setBookForm(this.editedBook);
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	private getEditedBook(): void {
		this.bookFormService
			.getEditedBook$()
			.pipe(
				takeUntil(this.destroy$),
				tap((books: BookData[]) => {
					this.editedBook = books[0];
				})
			)
			.subscribe();
	}
}
