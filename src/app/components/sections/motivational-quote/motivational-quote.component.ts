import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionNames, Quote } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-motivational-quote',
	templateUrl: './motivational-quote.component.html',
	styleUrls: ['./motivational-quote.component.scss'],
})
export class MotivateQuoteComponent implements OnInit {
	sectionName: typeof SectionNames = SectionNames;

	quote$: Observable<Quote>;

	constructor(
		private actionService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadQuote();
	}

	private loadQuote(): void {
		this.actionService.getSectionQuoteFormApi('happiness');
		this.quote$ = this.stateService.getSectionQuote();
	}
}
