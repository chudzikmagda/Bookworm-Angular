import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-last-added-book',
	templateUrl: './last-added-book.component.html',
	styleUrl: './last-added-book.component.scss',
	standalone: true,
	imports: [DatePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastAddedBookComponent {
	@Input() public lastAddedBook: BookData;
}
