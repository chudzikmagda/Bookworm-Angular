import { Injectable, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { BookForm } from '../models/book-form.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookData } from 'src/app/models/models';

@Injectable({
	providedIn: 'root',
})
export class BookFormService {
	private editedBook$ = new BehaviorSubject<BookData[]>([]);
	private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

	public setBookForm(book?: BookData): FormGroup<BookForm> {
		return this.formBuilder.group({
			author: [book?.author ?? '', [Validators.required, Validators.minLength(2)]],
			cover: [book?.cover ?? ''],
			description: [book?.description ?? ''],
			language: [book?.language ?? '', [Validators.required, Validators.minLength(2)]],
			rating: [book?.rating ?? 0, [Validators.required]],
			title: [book?.title ?? '', [Validators.required, Validators.minLength(2)]],
		});
	}

	public getEditedBook$(): Observable<BookData[]> {
		return this.editedBook$.asObservable();
	}

	public setEditedBook$(book: BookData[]): void {
		return this.editedBook$.next(book);
	}
}
