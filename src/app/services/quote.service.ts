import { HttpClient } from '@angular/common/http';
import { Quote } from '@angular/compiler';
import { Injectable } from '@angular/core';

export interface QuoteModel {
    author?: string;
    authorSlug?: string;
    content?: string;
    dateAdded?: string;
    length?: number;
    dateModified?: string;
    tags?: string[];
    _id: string;
}

@Injectable({
    providedIn: 'root',
})
export class QuoteService {
    apiUrl = 'https://api.quotable.io/random?tags=famous-quotes';

    constructor(private http: HttpClient) {}

    getQuote() {
        return this.http.get<QuoteModel>(this.apiUrl);
    }
}
