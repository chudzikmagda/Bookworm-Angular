import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy } from '@angular/core';
import { last, Subscription } from 'rxjs';
import { BookData, BookService } from '../../services/books.service';

interface BookStats {
    booksLength: number;
    bestBook: BookData;
    lastAddedBook: BookData;
    avgRating: number;
}

@Component({
    selector: 'c-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnDestroy {
    stats: BookStats;
    bookSubscription: Subscription;
    books: BookData[];

    constructor(private bookService: BookService) {}

    ngOnInit() {
        this.bookSubscription = this.bookService.getData().subscribe(res => {
            this.books = res;
            if (this.books.length > 0) {
                this.stats = {
                    booksLength: this.books.length,
                    bestBook: this.bookService.bestBook(this.books),
                    lastAddedBook: this.bookService.lastAddedBook(this.books),
                    avgRating: this.avgRating(this.books),
                };
            }
        });
    }

    avgRating(books: BookData[]): number {
        const ratings: number[] = books.map(item => item.rating);
        return ratings.reduce((prev, curr) => prev + curr) / books.length;
    }

    ngOnDestroy(): void {
        this.bookSubscription.unsubscribe();
    }
}
