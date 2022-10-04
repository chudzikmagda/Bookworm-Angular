import { Component } from '@angular/core';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-go-to-top',
	templateUrl: './go-to-top.component.html',
	styleUrls: ['./go-to-top.component.scss'],
})
export class GoToTopComponent {
	constructor(private actionService: ActionsService) {}

	goToTop(): void {
		this.actionService.scrollToTheId('header');
	}
}
