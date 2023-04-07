import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/models/models';

@Component({
	selector: 'c-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent {
	@Input() public quote: Quote;
}
