import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from 'src/app/components/shared/ui-elements/button/button.component';
import { ButtonVariant } from 'src/app/components/shared/ui-elements/button/models/button.models';
import { TableCellVariant } from 'src/app/components/shared/ui-elements/table-cell/models/table-cell.models';
import { BookData } from 'src/app/models/models';
import { TableCellComponent } from 'src/app/components/shared/ui-elements/table-cell/table-cell.component';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	standalone: true,
	imports: [DecimalPipe, ButtonComponent, TableCellComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	@Input() public books: BookData[];
	@Output() public deleteBook: EventEmitter<number> = new EventEmitter();
	@Output() public editBook: EventEmitter<number> = new EventEmitter();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;
	public readonly TABLE_CELL_VARIANT: typeof TableCellVariant = TableCellVariant;

	public onDeleteBook(bookIndex: number): void {
		this.deleteBook.emit(bookIndex);
	}

	public onEditBook(bookIndex: number): void {
		this.editBook.emit(bookIndex);
	}
}
