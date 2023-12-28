import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TableCellClasses, TableCellVariant } from './models/table-cell.models';
import { CommonModule } from '@angular/common';
@Component({
	selector: 'c-table-cell',
	templateUrl: './table-cell.component.html',
	styleUrls: ['./table-cell.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent implements OnInit {
	@Input() public editable: boolean = false;
	@Input() public variant: TableCellVariant;
	@Input() public valignCenter: boolean = false;

	public setClassBasedOnVariant(): TableCellClasses {
		return {
			'table-cell': true,
			'table-cell--cover': this.variant === TableCellVariant.COVER,
			'table-cell--icons': this.variant === TableCellVariant.ICONS,
			'table-cell--title': this.variant === TableCellVariant.TITLE,
			'table-cell--valign-center': this.valignCenter === true,
		};
	}
	public ngOnInit(): void {
		this.setClassBasedOnVariant();
	}
}
