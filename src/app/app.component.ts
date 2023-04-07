import { Component, OnInit } from '@angular/core';
import { ActionsService } from './services/actions/actions.service';

@Component({
	selector: 'c-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private readonly actionsService: ActionsService) {}

	public ngOnInit(): void {
		this.loadSampleData();
	}

	private loadSampleData(): void {
		this.actionsService.getBookListFromApi().subscribe();
	}
}
