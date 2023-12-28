import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from 'src/app/components/shared/ui-elements/button/button.component';
import { ButtonVariant } from 'src/app/components/shared/ui-elements/button/models/button.models';
import { TableCellVariant } from 'src/app/components/shared/ui-elements/table-cell/models/table-cell.models';
import { TableCellComponent } from 'src/app/components/shared/ui-elements/table-cell/table-cell.component';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	standalone: true,
	imports: [CommonModule, ButtonComponent, TableCellComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	@Input() public books: BookData[];
	@Output() public deleteBook: EventEmitter<HTMLElement> = new EventEmitter();
	@Output() public editBook: EventEmitter<number> = new EventEmitter();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;
	public readonly TABLE_CELL_VARIANT: typeof TableCellVariant = TableCellVariant;

	public onDeleteBook(tableRow: HTMLElement): void {
		this.deleteBook.emit(tableRow);
	}

	public onEditBook(tableRow: HTMLElement): void {
		this.editBook.emit(+tableRow.id);
	}
}
