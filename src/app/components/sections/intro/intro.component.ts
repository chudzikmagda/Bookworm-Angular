import { Component } from '@angular/core';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ADD_NEW_BOOK_PATH, SectionNames } from 'src/app/models/models';

@Component({
	selector: 'c-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
	sectionName: typeof SectionNames = SectionNames;
	private addNewBookPath = ADD_NEW_BOOK_PATH;

	constructor(private actionService: ActionsService) {}

	goToSummary(): void {
		this.actionService.scrollToTheId(SectionNames.Summary);
	}

	openDialog() {
		this.actionService.openDialog(this.addNewBookPath);
	}
}
