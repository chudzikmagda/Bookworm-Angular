import { Component } from '@angular/core';
import { ADD_NEW_BOOK_PATH } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	private addNewBookPath = ADD_NEW_BOOK_PATH;

	constructor(private actionsService: ActionsService) {}

	openDialog() {
		this.actionsService.openDialog(this.addNewBookPath);
	}
}
