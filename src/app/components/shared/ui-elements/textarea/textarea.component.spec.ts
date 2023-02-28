import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
	let component: TextareaComponent;
	let fixture: ComponentFixture<TextareaComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TextareaComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TextareaComponent);
		component = fixture.componentInstance;
		component.disabled = false;
		fixture.detectChanges();
	});

	it('should create TextareaComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set value from textarea', () => {
		const value = 'Test value';
		component.writeValue(value);

		expect(component.value).toEqual(value);
	});

	it('should set label for textarea', () => {
		const label = 'Test label';
		component.label = label;
		fixture.detectChanges();

		const textareaLabel = fixture.debugElement.query(By.css('.textarea-label'));

		expect(textareaLabel.nativeElement.innerText).toEqual(label);
	});

	it('should set placeholder for textarea', () => {
		const placeholder = 'Test placeholder';
		component.placeholder = placeholder;
		fixture.detectChanges();

		const textarea: DebugElement = fixture.debugElement.query(By.css('.textarea'));

		expect(textarea.nativeElement.placeholder).toEqual(placeholder);
	});

	it('should set textarea as required field', () => {
		component.required = true;
		fixture.detectChanges();

		const textarea: DebugElement = fixture.debugElement.query(By.css('.textarea'));

		expect(textarea.nativeElement.required).toBeTrue();
	});

	it('should disable textarea', () => {
		component.setDisabledState(true);
		fixture.detectChanges();

		const textarea: DebugElement = fixture.debugElement.query(By.css('.textarea'));

		expect(textarea.nativeElement.disabled).toBeTrue();
	});
});
