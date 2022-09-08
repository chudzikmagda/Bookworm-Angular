import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BookData } from 'src/app/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
	books$: Observable<BookData[]>;
	books: BookData[];
	destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private actionsService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadBookList();
	}

	loadBookList() {
		this.actionsService.getBookList(this.destroy$).subscribe();
		this.books$ = this.stateService.getBooks();
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
