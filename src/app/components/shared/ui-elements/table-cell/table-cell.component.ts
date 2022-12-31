import { Component, Input, OnInit } from '@angular/core';

interface setClassInterface {
	'table-cell': boolean;
	'table-cell--cover': boolean;
	'table-cell--title': boolean;
	'table-cell--valign-center': boolean;
}

@Component({
	selector: 'c-table-cell',
	templateUrl: './table-cell.component.html',
	styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent implements OnInit {
	@Input() editable: boolean = false;
	@Input() variant: 'cover' | 'title' | undefined;
	@Input() valignCenter: boolean = false;

	setClassBasedOnVariant(): setClassInterface {
		return {
			'table-cell': true,
			'table-cell--cover': this.variant === 'cover',
			'table-cell--title': this.variant === 'title',
			'table-cell--valign-center': this.valignCenter === true,
		};
	}
	ngOnInit() {
		this.setClassBasedOnVariant();
	}
}
