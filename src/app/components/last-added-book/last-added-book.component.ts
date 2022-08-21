import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookData } from 'src/app/models';
import { BookService } from 'src/app/services/books.service';

@Component({
	selector: 'c-last-added-book',
	templateUrl: './last-added-book.component.html',
	styleUrls: ['./last-added-book.component.scss'],
})
export class LastAddedBookComponent implements OnInit {
	books: BookData[];
	bookSubscription: Subscription;
	lastAddedBook: BookData;

	constructor(private bookService: BookService) {}

	ngOnInit(): void {
		this.bookSubscription = this.bookService.getData().subscribe(res => {
			this.books = res;
			if (this.books.length > 0) {
				this.lastAddedBook = this.bookService.lastAddedBook(this.books);
			}
		});
	}

	ngOnDestroy(): void {
		this.bookSubscription.unsubscribe();
	}
}
