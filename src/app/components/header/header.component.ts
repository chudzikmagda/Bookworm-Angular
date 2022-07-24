import { Component } from '@angular/core';
import { AddNewBookService } from '../add-new-book/add-new-book.service';

@Component({
	selector: 'c-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	constructor(public addNewBook: AddNewBookService) {}
}
