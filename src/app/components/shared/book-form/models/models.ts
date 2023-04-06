import { FormControl } from '@angular/forms';

export type BookForm = {
	author: FormControl<string>;
	cover: FormControl<string>;
	description: FormControl<string>;
	language: FormControl<string>;
	rating: FormControl<number>;
	title: FormControl<string>;
};

export enum BookFormErrors {
	'REQUIRED' = 'This field is required.',
	'MIN_LENGTH' = 'Value is too short. A minimum length is 2.',
}
