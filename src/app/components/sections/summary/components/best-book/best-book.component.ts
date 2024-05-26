import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-best-book',
	templateUrl: './best-book.component.html',
	styleUrl: './best-book.component.scss',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestBookComponent {
	@Input() public bestBook: BookData;
}
