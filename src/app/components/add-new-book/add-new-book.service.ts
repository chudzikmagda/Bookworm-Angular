import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AddNewBookService {
	constructor(private route: Router) {}

	openDialog() {
		this.route.navigate(['add-new-book']);
	}
}
