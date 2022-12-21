import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { BookData } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-best-book',
	templateUrl: './best-book.component.html',
	styleUrls: ['./best-book.component.scss'],
})
export class BestBookComponent implements OnInit {
	bestBook: BookData;
	private books: BookData[];

	constructor(private actionsService: ActionsService) {}

	ngOnInit(): void {
		this.loadBestBook();
	}

	private loadBestBook(): void {
		this.actionsService
			.getBookList()
			.pipe(
				tap((books: BookData[]) => (this.books = books)),
				tap(() => {
					this.books.length > 0 && this.setBestBook(this.books);
				})
			)
			.subscribe();
	}

	private setBestBook(books: BookData[]): BookData {
		return (this.bestBook = this.actionsService.bestBook(books));
	}
}
