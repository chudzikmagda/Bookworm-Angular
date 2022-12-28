import { Component, OnInit } from '@angular/core';
import { ActionsService } from './services/actions/actions.service';

@Component({
	selector: 'c-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private actionsService: ActionsService) {}

	ngOnInit(): void {
		this.loadSampleData();
	}

	private loadSampleData(): void {
		this.actionsService.getBookListFromApi().subscribe();
	}
}
