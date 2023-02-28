import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ButtonComponent } from '../button/button.component';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
	let component: DialogComponent;
	let fixture: ComponentFixture<DialogComponent>;
	let fakeActionsService: ActionsService;
	let dialog: HTMLElement;

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['closeDialog']);

		TestBed.configureTestingModule({
			declarations: [DialogComponent, ButtonComponent],
			imports: [BrowserAnimationsModule],
			providers: [
				{
					provide: ActionsService,
					useValue: fakeActionsService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		dialog = fixture.debugElement.query(By.css('dialog')).nativeElement;
	});

	it('should create DialogComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should create centred DialogComponent', () => {
		component.variant = 'center';
		fixture.detectChanges();

		component.setClasses();

		expect(dialog).toHaveClass('dialog--center');
	});

	it('should create bottom DialogComponent', () => {
		component.variant = 'bottom';
		fixture.detectChanges();

		component.setClasses();

		expect(dialog).toHaveClass('dialog--bottom');
	});

	it('should be DialogComponent not visible', () => {
		const dialogWrapper: DebugElement = fixture.debugElement.query(By.css('dialog-wrapper'));
		component.visible = false;
		fixture.detectChanges();

		expect(dialogWrapper).toBeNull();
	});

	it('should close DialogComponent on button click', () => {
		const dialogWrapper: DebugElement = fixture.debugElement.query(By.css('dialog-wrapper'));
		const button: HTMLElement = fixture.debugElement.query(By.directive(ButtonComponent)).nativeElement;

		button.click();

		expect(component.visible).toBeFalse();
		expect(dialogWrapper).toBeNull();
	});
});
