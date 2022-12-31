import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;
	let button: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		button = fixture.debugElement.query(By.css('button')).nativeElement;
		fixture.detectChanges();
	});

	it('should create button component', () => {
		expect(component).toBeTruthy();
	});

	it('should create primary button', () => {
		component.variant = 'primary';
		fixture.detectChanges();

		component.setClasses();

		expect(button).toHaveClass('btn--primary');
	});

	it('should create primary-outline button', () => {
		component.variant = 'primary-outline';
		fixture.detectChanges();

		component.setClasses();

		expect(button).toHaveClass('btn--primary-outline');
	});

	it('should create secondary button', () => {
		component.variant = 'secondary';
		fixture.detectChanges();

		component.setClasses();

		expect(button).toHaveClass('btn--secondary');
	});

	it('should create secondary-outline button', () => {
		component.variant = 'secondary-outline';
		fixture.detectChanges();

		component.setClasses();

		expect(button).toHaveClass('btn--secondary-outline');
	});

	it('should create icon button', () => {
		component.variant = 'icon';
		fixture.detectChanges();

		component.setClasses();

		expect(button).toHaveClass('btn--icon');
	});
});
