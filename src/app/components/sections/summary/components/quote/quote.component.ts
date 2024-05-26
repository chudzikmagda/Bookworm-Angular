import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Quote } from 'src/app/models/models';

@Component({
	selector: 'c-quote',
	templateUrl: './quote.component.html',
	styleUrl: './quote.component.scss',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent {
	@Input() public quote: Quote;
}
