import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-last-added-book',
	templateUrl: './last-added-book.component.html',
	styleUrls: ['./last-added-book.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastAddedBookComponent {
	@Input() public lastAddedBook: BookData;
}
