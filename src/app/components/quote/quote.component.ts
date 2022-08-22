import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { QuoteModel } from 'src/app/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
	quote$: Observable<QuoteModel>;

	constructor(
		private actionService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadQuote();
	}

	loadQuote(): void {
		this.actionService.getQuoteFormApi();
		this.quote$ = this.stateService.getQuote();
	}
}
