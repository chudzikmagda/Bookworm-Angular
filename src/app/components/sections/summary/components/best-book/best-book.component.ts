import { Component, Input } from '@angular/core';
import { BookData } from 'src/app/models/models';

@Component({
	selector: 'c-best-book',
	templateUrl: './best-book.component.html',
	styleUrls: ['./best-book.component.scss'],
})
export class BestBookComponent {
	@Input() bestBook: BookData;
}
