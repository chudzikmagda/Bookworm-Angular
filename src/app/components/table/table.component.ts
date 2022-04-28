import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService, BookData } from 'src/app/services/books.service';

@Component({
    selector: 'c-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    bookSubscription: Subscription;
    books: BookData[];

    constructor(private bookService: BookService) {}

    ngOnInit(): void {
        this.bookSubscription = this.bookService.getData().subscribe(res => {
            this.books = res;
        });
    }
}
