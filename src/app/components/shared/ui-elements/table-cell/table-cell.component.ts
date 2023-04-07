import { Component, Input, OnInit } from '@angular/core';
import { SetClassInterface } from './models/table-cell.models';
@Component({
	selector: 'c-table-cell',
	templateUrl: './table-cell.component.html',
	styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent implements OnInit {
	@Input() public editable: boolean = false;
	@Input() public variant: 'cover' | 'icons' | 'title' | undefined;
	@Input() public valignCenter: boolean = false;

	public setClassBasedOnVariant(): SetClassInterface {
		return {
			'table-cell': true,
			'table-cell--cover': this.variant === 'cover',
			'table-cell--icons': this.variant === 'icons',
			'table-cell--title': this.variant === 'title',
			'table-cell--valign-center': this.valignCenter === true,
		};
	}
	public ngOnInit(): void {
		this.setClassBasedOnVariant();
	}
}
