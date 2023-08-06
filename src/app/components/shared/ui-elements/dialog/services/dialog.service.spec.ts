import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { Router, Routes } from '@angular/router';
import { AddNewBookComponent } from '../../../add-new-book/add-new-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';

describe('DialogService', () => {
	let service: DialogService;
	let fakeLocation: { back: jasmine.Spy };
	let fakeRouter: { navigate: jasmine.Spy };

	const testRoutes: Routes = [{ path: 'testPath', component: AddNewBookComponent }];

	beforeEach(() => {
		fakeLocation = {
			back: jasmine.createSpy('back'),
		};

		fakeRouter = {
			navigate: jasmine.createSpy('navigate'),
		};

		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes(testRoutes)],
			providers: [
				{ provide: Router, useValue: fakeRouter },
				{ provide: Location, useValue: fakeLocation },
			],
		});

		service = TestBed.inject(DialogService);
	});

	it('should open a dialog', () => {
		const path: string = 'testPath';

		service.openDialog(path);

		expect(fakeRouter.navigate).toHaveBeenCalledWith([path]);
	});

	fit('should close a dialog', () => {
		const fakeVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

		service.closeDialog(true, fakeVisibleChange);

		expect(fakeVisibleChange.emit).toHaveBeenCalledWith(true);
		expect(fakeLocation.back).toHaveBeenCalled();
	});
});
