export const ADD_NEW_BOOK_PATH = 'add-new-book';

export interface BookData {
	id: number;
	author: string;
	title: string;
	language: string;
	description: string;
	rating: number;
	date_add: string;
	date_edit: string;
	cover: string;
}

export type BookForm = Pick<
	BookData,
	'id' | 'author' | 'title' | 'language' | 'rating' | 'cover'
>;

export interface QuoteModel {
	author?: string;
	authorSlug?: string;
	content?: string;
	dateAdded?: string;
	length?: number;
	dateModified?: string;
	tags?: string[];
	_id?: string;
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
