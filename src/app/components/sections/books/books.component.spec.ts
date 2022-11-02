import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BooksComponent } from './books.component';

describe('BooksComponent', () => {
	let component: BooksComponent;
	let fixture: ComponentFixture<BooksComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BooksComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BooksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create BooksComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set section name', () => {
		const section: HTMLElement = fixture.debugElement.query(
			By.css('.section--books')
		).nativeElement;

		expect(section.id).toEqual(component.sectionName.BookList);
	});
});
