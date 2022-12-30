import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote, SectionNames } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
	QUOTE_TAG: string = 'famous-quotes';
	sectionName: typeof SectionNames = SectionNames;
	quote$: Observable<Quote | null>;

	constructor(
		private actionsService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadQuote();
	}

	loadQuote(): void {
		this.actionsService.getSummaryQuoteFormApi(this.QUOTE_TAG);
		this.quote$ = this.stateService.getSummaryQuote();
	}
}
