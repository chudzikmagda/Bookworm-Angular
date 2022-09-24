import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'c-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
	books$: Observable<BookData[]>;
	private books: BookData[];
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private actionsService: ActionsService,
		private stateService: StateService
	) {}

	ngOnInit(): void {
		this.stateService
			.getBooks()
			.pipe(takeUntil(this.destroy$))
			.subscribe((books: BookData[]) => (this.books = books));
		this.loadBookList();
	}

	deleteBook(tableRow: HTMLElement) {
		this.actionsService.deleteBook(+tableRow.id, this.books);
		this.books$ = this.stateService.getBooks();
	}

	private loadBookList() {
		this.books$ = this.stateService.getBooks();
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}
}
