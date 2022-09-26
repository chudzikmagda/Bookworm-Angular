import { Component } from '@angular/core';
import { SectionNames } from 'src/app/models/models';

@Component({
	selector: 'c-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
	sectionName: typeof SectionNames = SectionNames;
}
