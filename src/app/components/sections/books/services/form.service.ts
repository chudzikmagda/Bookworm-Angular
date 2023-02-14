import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookData } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class FormService {
	private editedBook$ = new BehaviorSubject<BookData[]>([]);

	getEditedBook$(): Observable<BookData[]> {
		return this.editedBook$.asObservable();
	}

	setEditedBook$(book: BookData[]): void {
		return this.editedBook$.next(book);
	}
}
