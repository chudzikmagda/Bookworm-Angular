import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookData {
    id: string;
    author_firstname: string;
    author_lasttname: string;
    title: string;
    language: string;
    description: string;
    like: string;
    date_add: string;
    date_edit: string;
    cover: string;
}
@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private http: HttpClient) {}

    getData(): Observable<BookData[]> {
        return this.http.get<BookData[]>('../../assets/store/books-data.json');
    }
}
