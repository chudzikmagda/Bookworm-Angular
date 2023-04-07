import { Component } from '@angular/core';
import { ADD_NEW_BOOK_PATH } from 'src/app/models/models';
import { DialogService } from '../shared/ui-elements/dialog/services/dialog.service';

@Component({
	selector: 'c-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	private readonly addNewBookPath: string = ADD_NEW_BOOK_PATH;

	constructor(private readonly dialogService: DialogService) {}

	public openDialog(): void {
		this.dialogService.openDialog(this.addNewBookPath);
	}
}
