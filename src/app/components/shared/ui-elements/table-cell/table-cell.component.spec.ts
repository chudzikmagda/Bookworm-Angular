import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableCellComponent } from './table-cell.component';

describe('TableCellComponent', () => {
	let component: TableCellComponent;
	let fixture: ComponentFixture<TableCellComponent>;
	let tableCell: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TableCellComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TableCellComponent);
		component = fixture.componentInstance;
		tableCell = fixture.debugElement.query(By.css('.table-cell'));
		fixture.detectChanges();
	});

	it('should create TableCellComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set default class on init', () => {
		component.ngOnInit();

		expect(tableCell.nativeElement).toHaveClass('table-cell');
	});

	it('should create cover variant of table cell', () => {
		component.variant = 'cover';
		fixture.detectChanges();

		component.setClassBasedOnVariant();

		expect(tableCell.nativeElement).toHaveClass('table-cell--cover');
	});

	it('should create title variant of table cell', () => {
		component.variant = 'title';
		fixture.detectChanges();

		component.setClassBasedOnVariant();

		expect(tableCell.nativeElement).toHaveClass('table-cell--title');
	});

	it('should create table cell with valign center', () => {
		component.valignCenter = true;
		fixture.detectChanges();

		component.setClassBasedOnVariant();

		expect(tableCell.nativeElement).toHaveClass('table-cell--valign-center');
	});

	it('should create editable table cell', () => {
		component.editable = true;
		fixture.detectChanges();

		expect(!!tableCell.nativeElement.getAttribute('contenteditable')).toBeTrue();
	});
});
