import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { BookData } from 'src/app/models/models';
import { By } from '@angular/platform-browser';
import { MockComponents } from 'ng-mocks';
import { TableCellComponent } from 'src/app/components/shared/ui-elements/table-cell/table-cell.component';
import { ButtonComponent } from 'src/app/components/shared/ui-elements/button/button.component';

describe('TableComponent', () => {
	let component: TableComponent;
	let fixture: ComponentFixture<TableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TableComponent, MockComponents(TableCellComponent, ButtonComponent)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TableComponent);
		component = fixture.componentInstance;
		component.books = fakeBooks();
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should create table with data', () => {
		const tableItems: number = fixture.debugElement.queryAll(
			By.css('.table__row:not(.table__row--heading)')
		).length;

		expect(tableItems).toBe(2);
	});

	it('should emit deleteBook event on delete button click', () => {
		const spyEventEmitter: jasmine.Spy = spyOn(component.deleteBook, 'emit');
		const fakeTableRow: HTMLElement = document.createElement('div');
		fakeTableRow.id = '1';

		component.onDeleteBook(fakeTableRow);

		expect(spyEventEmitter).toHaveBeenCalledWith(fakeTableRow);
	});

	it('should emit editBook event on delete button click', () => {
		const spyEventEmitter: jasmine.Spy = spyOn(component.editBook, 'emit');
		const fakeTableRow: HTMLElement = document.createElement('div');
		fakeTableRow.id = '1';

		component.onEditBook(fakeTableRow);

		expect(spyEventEmitter).toHaveBeenCalledWith(1);
	});

	const fakeBooks = (): BookData[] => {
		return [
			{
				id: 1,
				author: 'fakeAuthor1',
				title: 'fakeTitle1',
				language: 'fakeLang1',
				description: 'fakeDescription1',
				rating: 10,
				date_add: '10 November 2022',
				cover: 'fakeCover.jpg',
			},
			{
				id: 2,
				author: 'fakeAuthor2',
				title: 'fakeTitle2',
				language: 'fakeLang2',
				description: 'fakeDescription2',
				rating: 5,
				date_add: '10 November 2000',
				cover: 'fakeCover.jpg',
			},
		];
	};
});
