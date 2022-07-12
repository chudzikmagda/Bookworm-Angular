import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookData, BookService } from 'src/app/services/books.service';

@Component({
    selector: 'c-best-book',
    templateUrl: './best-book.component.html',
    styleUrls: ['./best-book.component.scss'],
})
export class BestBookComponent implements OnInit, OnDestroy {
    books: BookData[];
    bookSubscription: Subscription;
    bestBook: BookData;

    constructor(private bookService: BookService) {}

    ngOnInit(): void {
        this.bookSubscription = this.bookService.getData().subscribe(res => {
            this.books = res;
            if (this.books.length > 0) {
                this.bestBook = this.bookService.bestBook(this.books);
            }
        });
    }

    ngOnDestroy(): void {
        this.bookSubscription.unsubscribe();
    }
}
