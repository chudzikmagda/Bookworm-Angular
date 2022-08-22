import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BookData, QuoteModel } from 'src/app/models';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	private books$ = new BehaviorSubject<BookData[]>([]);
	private quote$ = new BehaviorSubject<QuoteModel>([]);

	getBooks(): Observable<BookData[]> {
		return this.books$.asObservable();
	}

	setBooks(books: BookData[]): any {
		return this.books$.next(books);
	}

	getQuote(): Observable<QuoteModel> {
		return this.quote$.asObservable();
	}

	setQuote(quote: QuoteModel): any {
		return this.quote$.next(quote);
	}
}
