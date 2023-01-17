import { Component, Input } from '@angular/core';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-last-added-book',
	templateUrl: './last-added-book.component.html',
	styleUrls: ['./last-added-book.component.scss'],
})
export class LastAddedBookComponent {
	@Input() lastAddedBook: BookData;
}
