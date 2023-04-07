import { EventEmitter, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(private readonly location: Location, private readonly route: Router) {}

	public openDialog(path: string): void {
		this.route.navigate([path]);
	}

	public closeDialog(visible: boolean, visibleChange: EventEmitter<boolean>): void {
		visibleChange.emit(visible);
		this.location.back();
	}
}
