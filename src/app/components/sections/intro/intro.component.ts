import { Component } from '@angular/core';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { SectionNames } from 'src/app/models/models';

@Component({
	selector: 'c-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
	sectionName: typeof SectionNames = SectionNames;

	constructor(private actionService: ActionsService) {}

	goToSummary(): void {
		this.actionService.scrollToTheId(SectionNames.Summary);
	}
}
