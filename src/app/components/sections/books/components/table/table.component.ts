import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonVariant } from 'src/app/components/shared/ui-elements/button/models/button.models';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	@Input() public books: BookData[];
	@Output() public deleteBook: EventEmitter<HTMLElement> = new EventEmitter();
	@Output() public editBook: EventEmitter<number> = new EventEmitter();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;

	public onDeleteBook(tableRow: HTMLElement): void {
		this.deleteBook.emit(tableRow);
	}

	public onEditBook(tableRow: HTMLElement): void {
		this.editBook.emit(+tableRow.id);
	}
}
