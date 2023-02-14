import { FormControl } from '@angular/forms';

export type EditBookForm = {
	author: FormControl<string>;
	cover: FormControl<string>;
	description: FormControl<string>;
	language: FormControl<string>;
	rating: FormControl<number>;
	title: FormControl<string>;
};
