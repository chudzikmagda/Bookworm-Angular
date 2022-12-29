import { Component, Input } from '@angular/core';

@Component({
	selector: 'c-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() click: void;
	@Input() disabled: boolean;
	@Input() class: string;
	@Input() type: string;
	@Input() variant:
		| 'primary'
		| 'secondary'
		| 'primary-outline'
		| 'secondary-outline'
		| 'icon';

	@Input() size: 'large' | 'small';

	setClasses() {
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
