import { Component } from '@angular/core';
import { ADD_NEW_BOOK_PATH } from 'src/app/models/models';
import { DialogService } from '../shared/ui-elements/dialog/service/dialog.service';

@Component({
	selector: 'c-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	private addNewBookPath = ADD_NEW_BOOK_PATH;

	constructor(private dialogService: DialogService) {}

	openDialog() {
		this.dialogService.openDialog(this.addNewBookPath);
	}
}
