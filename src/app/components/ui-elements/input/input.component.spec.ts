import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

fdescribe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [InputComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		component.disabled = false;
		fixture.detectChanges();
	});

	it('should create InputComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set value from input', () => {
		const value = 'Test value';
		component.writeValue(value);

		expect(component.value).toEqual(value);
	});

	it('should set label for input', () => {
		const label = 'Test label';
		component.label = label;
		fixture.detectChanges();

		const textareaLabel = fixture.debugElement.query(
			By.css('.input-label')
		);

		expect(textareaLabel.nativeElement.innerText).toEqual(label);
	});

	it('should set placeholder for input', () => {
		const placeholder = 'Test placeholder';
		component.placeholder = placeholder;
		fixture.detectChanges();

		const input: DebugElement = fixture.debugElement.query(
			By.css('.input')
		);

		expect(input.nativeElement.placeholder).toEqual(placeholder);
	});

	it('should set input as required field', () => {
		component.required = true;
		fixture.detectChanges();

		const input: DebugElement = fixture.debugElement.query(
			By.css('.input')
		);

		expect(input.nativeElement.required).toBeTrue();
	});

	it('should disable input', () => {
		component.setDisabledState(true);
		fixture.detectChanges();

		const input: DebugElement = fixture.debugElement.query(
			By.css('.input')
		);

		expect(input.nativeElement.disabled).toBeTrue();
	});
});
