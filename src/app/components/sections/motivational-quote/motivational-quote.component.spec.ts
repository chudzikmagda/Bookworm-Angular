import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { QuoteModel } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

import { MotivateQuoteComponent } from './motivational-quote.component';

describe('MotivateQuoteComponent', () => {
	let component: MotivateQuoteComponent;
	let fixture: ComponentFixture<MotivateQuoteComponent>;
	let fakeActionsService: ActionsService;
	let fakeStateService: StateService;
	let fakeQuote$ = new BehaviorSubject<QuoteModel[]>([]);

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', [
			'getSectionQuoteFormApi',
		]);

		fakeStateService = jasmine.createSpyObj('StateService', [
			'getSectionQuote',
		]);

		fakeQuote$.next(quoteMock);

		TestBed.configureTestingModule({
			declarations: [MotivateQuoteComponent],
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

		fixture = TestBed.createComponent(MotivateQuoteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create MotivateQuoteComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set section name', () => {
		component.quote$ = fakeQuote$;
		fixture.detectChanges();

		const section: HTMLElement = fixture.debugElement.query(
			By.css('.section--motivational-quote')
		).nativeElement;

		expect(section.id).toEqual(component.sectionName.MotivationalQuote);
	});

	it('should load quote on init', done => {
		component.ngOnInit();

		component.quote$ = fakeQuote$;

		component.quote$.subscribe((data: QuoteModel) => {
			expect(data.length).toEqual(1);
			done();
		});
	});
});

const quoteMock: QuoteModel[] = [
	{
		author: 'Alfred Tennyson',
		authorSlug: 'alfred-tennyson',
		content:
			'The happiness of a man in this life does not consist in the absence but in the mastery of his passions.',
		dateAdded: '2022-04-14',
		dateModified: '2022-04-14',
		length: 103,
		tags: ['famous-quotes', 'happiness'],
		_id: 'dHwWmstTfXUC',
	},
];
