import { FormControl } from '@angular/forms';

export type AddNewForm = {
	author: FormControl<string>;
	cover: FormControl<string>;
	description: FormControl<string>;
	language: FormControl<string>;
	rating: FormControl<number>;
	title: FormControl<string>;
};
