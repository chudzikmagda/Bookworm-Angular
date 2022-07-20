import { Component, Input } from '@angular/core';

@Component({
	selector: 'c-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() click!: void;
	@Input() variant!: string;

	setClasses() {
		return {
			btn: true,
			'btn--primary':
				this.variant !== 'primary' && this.variant !== 'icon',
			'btn--secondary': this.variant === 'secondary',
			'btn--icon': this.variant === 'icon',
		};
	}
}
