import { Component, Input } from '@angular/core';

@Component({
	selector: 'c-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() public click: void;
	@Input() public disabled: boolean;
	@Input() public class: string;
	@Input() public type: string;
	@Input() public variant: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'icon';
	@Input() public size: 'large' | 'small';

	public setClasses(): { [key: string]: boolean } {
		return {
			btn: true,
			'btn--primary': this.variant === 'primary',
			'btn--secondary': this.variant === 'secondary',
			'btn--primary-outline': this.variant === 'primary-outline',
			'btn--secondary-outline': this.variant === 'secondary-outline',
			'btn--icon': this.variant === 'icon',
			'btn--disabled': this.disabled,
			'btn--large': this.size === 'large',
			'btn--small': this.size === 'small',
		};
	}
}
