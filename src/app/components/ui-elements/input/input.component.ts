import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
	selector: 'c-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
	@Input() class: string;
	@Input() disabled: boolean;
	@Input() label = '';
	@Input() placeholder = '';
	@Input() required: true | false = false;
	@Input() type: string;
	value = '';

	constructor(
		@Self()
		@Optional()
		private ngControl: NgControl
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onChange(value: string) {}
	onTouched() {}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
