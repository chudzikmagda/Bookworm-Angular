import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	@Input() books: BookData[];
	@Output() deleteBook: EventEmitter<HTMLElement> = new EventEmitter();

	onDeleteBook(tableRow: HTMLElement) {
		this.deleteBook.emit(tableRow);
	}
}
