import { BookData } from 'src/app/models/models';

export type BookStats = {
	booksLength: number;
	bestBook: BookData;
	lastAddedBook: BookData;
	avgRating: number;
};
