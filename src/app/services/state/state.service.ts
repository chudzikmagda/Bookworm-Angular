import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

	setBooks(books: BookData[]): void {
		return this.books$.next([...this.books$.getValue(), ...books]);
	}

	getQuote(): Observable<QuoteModel> {
		return this.quote$.asObservable();
	}

	setQuote(quote: QuoteModel): void {
		return this.quote$.next(quote);
	}
}
