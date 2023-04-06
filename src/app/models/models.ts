export const ADD_NEW_BOOK_PATH: string = 'add-new-book';
export const EDIT_BOOK_PATH: string = 'edit-book';

export type BookData = {
	id: number;
	author: string;
	title: string;
	language: string;
	description: string;
	rating: number;
	date_add: string;
	date_edit?: string;
	cover: string;
};

export type BookFormData = Pick<
	BookData,
	'author' | 'description' | 'title' | 'language' | 'rating' | 'cover'
>;

export type Quote = {
	author: string;
	authorSlug: string;
	content: string;
	dateAdded: string;
	length: number;
	dateModified: string;
	tags: string[];
	_id: string;
};

export enum SectionNames {
	INTRO = 'Intro',
	SUMMARY = 'Summary',
	BOOK_LIST = 'BookList',
	MOTIVATIONAL_QUOTE = 'MotivationalQuote',
}
