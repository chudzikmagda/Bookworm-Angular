import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Quote } from 'src/app/models/models';

import { QuoteComponent } from './quote.component';

describe('QuoteComponent', () => {
	let component: QuoteComponent;
	let fixture: ComponentFixture<QuoteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [QuoteComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(QuoteComponent);
		component = fixture.componentInstance;
		component.quote = fakeQuote();
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should display a quote content', () => {
		const quoteContent: string = fixture.debugElement.query(
			By.css('.quote__paragraph')
		).nativeElement.innerText;

		expect(quoteContent).toBe(fakeQuote().content);
	});

	it('should display an author of quote', () => {
		const quoteAuthor: string = fixture.debugElement.query(
			By.css('.quote__source')
		).nativeElement.innerText;

		expect(quoteAuthor).toBe('— ' + fakeQuote().author + ' —');
	});

	const fakeQuote = (): Quote => {
		return {
			author: 'fake author',
			authorSlug: 'fake authorSlug',
			content: 'Lorem ipsum',
			dateAdded: 'fake dateAdded',
			length: 1,
			dateModified: 'fake dateModified',
			tags: ['tag1', 'tag2'],
			_id: 'fakeId',
		};
	};
});
