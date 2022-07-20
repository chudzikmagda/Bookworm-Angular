import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuoteModel, QuoteService } from 'src/app/services/quote.service';

@Component({
	selector: 'c-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit, OnDestroy {
	quote: QuoteModel;
	quoteSubscription: Subscription;

	constructor(private service: QuoteService) {}

	ngOnInit(): void {
		this.quoteSubscription = this.service
			.getQuote()
			.subscribe(res => (this.quote = res));
	}

	ngOnDestroy(): void {
		this.quoteSubscription.unsubscribe();
	}
}
