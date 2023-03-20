export const ADD_NEW_BOOK_PATH: string = 'add-new-book';
export const EDIT_BOOK_PATH: string = 'edit-book';

export interface BookData {
	id: number;
	author: string;
	title: string;
	language: string;
	description: string;
	rating: number;
	date_add: string;
	date_edit?: string;
	cover: string;
}

export type BookForm = Pick<BookData, 'id' | 'author' | 'title' | 'language' | 'rating' | 'cover'>;

export interface Quote {
	author: string;
	authorSlug: string;
	content: string;
	dateAdded: string;
	length: number;
	dateModified: string;
	tags: string[];
	_id: string;
}

export enum SectionNames {
	Intro = 'Intro',
	Summary = 'Summary',
	BookList = 'BookList',
	MotivationalQuote = 'MotivationalQuote',
}

export interface Errors {
	required: string;
	minLength: string;
}
