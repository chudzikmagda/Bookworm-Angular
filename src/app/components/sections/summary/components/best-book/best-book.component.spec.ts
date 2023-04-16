import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestBookComponent } from './best-book.component';
import { BookData } from 'src/app/models/models';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('BestBookComponent', () => {
	let component: BestBookComponent;
	let fixture: ComponentFixture<BestBookComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BestBookComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BestBookComponent);
		component = fixture.componentInstance;
		component.bestBook = bestBook();
	});

	it('should create BestBookComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should display the best book on init when input value is truthy', () => {
		fixture.detectChanges();

		const bestBook: DebugElement = fixture.debugElement.query(By.css('.best-book'));
		expect(bestBook).not.toBeNull();
	});

	it('should not display the best book on init when input value eis falsy', () => {
		component.bestBook = undefined as unknown as BookData;

		fixture.detectChanges();

		const bestBook: DebugElement = fixture.debugElement.query(By.css('.best-book'));
		expect(bestBook).toBeNull();
	});
});

const bestBook = (): BookData => {
	return {
		author: 'The Help',
		cover: 'assets/images/book_covers/help-stockett.jpg',
		date_add: 'September 14, 2022, 3:53 pm',
		date_edit: 'September 15, 2022, 3:53 pm',
		description: 'Lorem ipsum',
		id: 7,
		language: 'English',
		rating: 9.5,
		title: 'Kathryn Stockett',
	};
};
