import { Component } from '@angular/core';
import { SectionNames, ADD_NEW_BOOK_PATH } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../../shared/ui-elements/dialog/services/dialog.service';

@Component({
	selector: 'c-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
	sectionName: typeof SectionNames = SectionNames;
	private addNewBookPath = ADD_NEW_BOOK_PATH;

	constructor(
		private actionService: ActionsService,
		private dialogService: DialogService
	) {}

	goToSummary(): void {
		this.actionService.scrollToTheId(SectionNames.Summary);
	}

	openDialog() {
		this.dialogService.openDialog(this.addNewBookPath);
	}
}
