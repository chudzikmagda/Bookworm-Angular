import { Component, Input, OnInit } from '@angular/core';

interface setClassInterface {
	'table-cell': boolean;
	'table-cell--cover': boolean;
	'table-cell--icons': boolean;
	'table-cell--title': boolean;
	'table-cell--valign-center': boolean;
}

@Component({
	selector: 'c-table-cell',
	templateUrl: './table-cell.component.html',
	styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent implements OnInit {
	@Input() public editable: boolean = false;
	@Input() public variant: 'cover' | 'icons' | 'title' | undefined;
	@Input() public valignCenter: boolean = false;

	public setClassBasedOnVariant(): setClassInterface {
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
