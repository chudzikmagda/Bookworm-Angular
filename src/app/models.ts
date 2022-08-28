export const ADD_NEW_BOOK_PATH = 'add-new-book';

export interface BookData {
	id: string;
	author: string;
	title: string;
	language: string;
	description: string;
	rating: number;
	date_add: string;
	date_edit: string;
	cover: string;
}

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
