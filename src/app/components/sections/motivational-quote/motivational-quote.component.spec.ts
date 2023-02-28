import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Quote } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

import { MotivateQuoteComponent } from './motivational-quote.component';

describe('MotivateQuoteComponent', () => {
	let component: MotivateQuoteComponent;
	let fixture: ComponentFixture<MotivateQuoteComponent>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;
	let fakeStateService: jasmine.SpyObj<StateService>;
	let fakeQuote$ = new BehaviorSubject<Quote>({} as Quote);

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['getSectionQuoteFormApi']);

		fakeStateService = jasmine.createSpyObj('StateService', ['getSectionQuote']);

		fakeQuote$.next(fakeQuoteMock());

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
		const section: HTMLDivElement = fixture.debugElement.query(
			By.css('.section--motivational-quote')
		).nativeElement;

		expect(section.id).toEqual(component.sectionName.MotivationalQuote);
	});

	it('should load quote on init', done => {
		component.quote$ = fakeQuote$;

		component.quote$.subscribe((data: Quote) => {
			expect(data).toEqual(fakeQuoteMock());
			done();
		});
		expect(fakeActionsService.getSectionQuoteFormApi).toHaveBeenCalledTimes(1);
		expect(fakeStateService.getSectionQuote).toHaveBeenCalled();
	});

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
