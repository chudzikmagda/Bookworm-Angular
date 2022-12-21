import { Component } from '@angular/core';
import { ActionsService } from './services/actions/actions.service';

@Component({
	selector: 'c-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(private actionsService: ActionsService) {
		this.actionsService.getBookList().subscribe();
	}
}
