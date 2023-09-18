import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../shared/ui-elements/dialog/services/dialog.service';
import { AddNewBookComponent } from '../shared/add-new-book/add-new-book.component';

@Component({
	selector: 'c-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@ViewChild('addNewBookDialog', { read: ViewContainerRef }) public addNewBookDialog!: ViewContainerRef;

	constructor(private readonly dialogService: DialogService) {}

	public openDialog(): void {
		this.dialogService.openDialog(this.addNewBookDialog, AddNewBookComponent);
	}
}
