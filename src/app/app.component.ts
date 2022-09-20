import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BookData } from './models';
import { ActionsService } from './services/actions/actions.service';

@Component({
	selector: 'c-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private actionsService: ActionsService) {
		this.actionsService.getBookList(this.destroy$).subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
