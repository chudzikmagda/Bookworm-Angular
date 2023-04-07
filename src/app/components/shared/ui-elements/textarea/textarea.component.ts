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
	@Input() public required: true | false = false;
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

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public onChange(value: string): void {}

	public onTouched(): void {}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
