import { EventEmitter, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(private location: Location, private route: Router) {}

	openDialog(path: string): void {
		this.route.navigate([path]);
	}

	closeDialog(visible: boolean, visibleChange: EventEmitter<boolean>) {
		visibleChange.emit(visible);
		this.location.back();
	}
}
