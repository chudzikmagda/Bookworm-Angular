import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { SectionNames } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../../shared/ui-elements/dialog/services/dialog.service';
import { AddNewBookComponent } from '../../shared/add-new-book/add-new-book.component';

@Component({
	selector: 'c-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
	@ViewChild('addNewBookDialog', { read: ViewContainerRef }) public addNewBookDialog!: ViewContainerRef;

	public sectionName: typeof SectionNames = SectionNames;

	constructor(
		private readonly actionService: ActionsService,
		private readonly dialogService: DialogService
	) {}

	public goToSummary(): void {
		this.actionService.scrollToTheId(SectionNames.SUMMARY);
	}

	public openDialog(): void {
		this.dialogService.openDialog(this.addNewBookDialog, AddNewBookComponent);
	}
}
