import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SectionNames, Quote } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-motivational-quote',
	templateUrl: './motivational-quote.component.html',
	styleUrl: './motivational-quote.component.scss',
	standalone: true,
	imports: [AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotivateQuoteComponent implements OnInit {
	public readonly SECTION_NAME: typeof SectionNames = SectionNames;

	public quote$: Observable<Quote>;

	private actionService: ActionsService = inject(ActionsService);
	private stateService: StateService = inject(StateService);

	public ngOnInit(): void {
		this.loadQuote();
	}

	private loadQuote(): void {
		this.actionService.getSectionQuoteFormApi('happiness');
		this.quote$ = this.stateService.getSectionQuote();
	}
}
