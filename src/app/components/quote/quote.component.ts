import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
	quote$: Observable<Quote>;

	constructor(
		private actionService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadQuote();
	}

	loadQuote(): void {
		this.actionService.getSummaryQuoteFormApi('famous-quotes');
		this.quote$ = this.stateService.getSummaryQuote();
	}
}
