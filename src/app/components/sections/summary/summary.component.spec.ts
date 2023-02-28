import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SummaryComponent } from './summary.component';
import { MockComponents } from 'ng-mocks';
import { StatsComponent } from './components/stats/stats.component';
import { BestBookComponent } from './components/best-book/best-book.component';
import { QuoteComponent } from './components/quote/quote.component';
import { LastAddedBookComponent } from './components/last-added-book/last-added-book.component';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of, tap } from 'rxjs';
import { BookData, Quote } from 'src/app/models/models';

describe('SummaryComponent', () => {
	let component: SummaryComponent;
	let fixture: ComponentFixture<SummaryComponent>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;
	let fakeStateService: jasmine.SpyObj<StateService>;
	let fakeQuote$ = new BehaviorSubject<Quote>({} as Quote);

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['getSummaryQuoteFormApi', 'getBooks']);

		fakeStateService = jasmine.createSpyObj('StateService', ['getSummaryQuote']);

		fakeQuote$.next(fakeQuoteMock());

		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [
				SummaryComponent,
				MockComponents(StatsComponent, BestBookComponent, QuoteComponent, LastAddedBookComponent),
			],
			providers: [
				{
					provide: ActionsService,
					useValue: fakeActionsService,
				},
				{
					provide: StateService,
					useValue: fakeStateService,
				},
			],
		}).compileComponents();

		fakeActionsService.getBooks.and.returnValue(of(fakeBookList()));

		fixture = TestBed.createComponent(SummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create SummaryComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set section name', () => {
		const section: HTMLElement = fixture.debugElement.query(By.css('.section--summary')).nativeElement;

		expect(section.id).toEqual(component.sectionName.Summary);
	});

	it('should set best book on component init', async () => {
		fixture.detectChanges();
		console.log(component.bestBook);

		expect(fakeActionsService.getBooks).toHaveBeenCalledTimes(1);
	});

	it('should set quote on component init', done => {
		component.quote$ = fakeQuote$;

		component.quote$.subscribe((data: Quote | null) => {
			expect(data).toEqual(fakeQuoteMock());
			done();
		});
		expect(fakeStateService.getSummaryQuote).toHaveBeenCalled();
	});

	const fakeBookList = (): BookData[] => {
		return [
			{
				author: 'Sample book',
				cover: 'assets/images/book_covers/help-stockett.jpg',
				date_add: 'September 13, 2022, 3:53 pm',
				date_edit: 'September 15, 2022, 3:53 pm',
				description: 'Lorem ipsum',
				id: 1,
				language: 'English',
				rating: 9.5,
				title: 'Kathryn Stockett',
			},
			{
				author: 'Lorem ipsum',
				cover: 'assets/images/book_covers/help-stockett.jpg',
				date_add: 'September 14, 2022, 3:53 pm',
				date_edit: 'September 15, 2022, 3:53 pm',
				description: 'Lorem ipsum',
				id: 2,
				language: 'English',
				rating: 5.5,
				title: 'Kathryn Stockett',
			},
		];
	};

	const fakeQuoteMock = (): Quote => {
		return {
			author: 'Alfred Tennyson',
			authorSlug: 'alfred-tennyson',
			content:
				'The happiness of a man in this life does not consist in the absence but in the mastery of his passions.',
			dateAdded: '2022-04-14',
			dateModified: '2022-04-14',
			length: 103,
			tags: ['famous-quotes', 'happiness'],
			_id: 'dHwWmstTfXUC',
		};
	};
});
