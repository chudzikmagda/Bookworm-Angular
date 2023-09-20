import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
	selector: 'c-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements ControlValueAccessor {
	@Input() public label = '';
	@Input() public placeholder = '';
	@Input() public required: boolean = false;
	@Input() public disabled: boolean;
	public value = '';

	constructor(
		@Self()
		@Optional()
		private readonly ngControl: NgControl
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}
	public writeValue(value: string): void {
		this.value = value;
	}

	public registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public onChange(_value: string): void {}

	public onTouched(): void {}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
