import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData } from 'src/app/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
	books$: Observable<BookData[]>;
	books: BookData[];

	constructor(
		private actionsService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.loadBookList();
	}

	loadBookList() {
		this.actionsService.getBookList();
		this.books$ = this.stateService.getBooks();
	}
}
