import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	@Input() books: BookData[];
	@Output() deleteBook: EventEmitter<HTMLElement> = new EventEmitter();
	@Output() editBook: EventEmitter<number> = new EventEmitter();

	public onDeleteBook(tableRow: HTMLElement): void {
		this.deleteBook.emit(tableRow);
	}

	public onEditBook(tableRow: HTMLElement): void {
		this.editBook.emit(+tableRow.id);
	}
}
