import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonClasses, ButtonSize, ButtonVariant } from './models/button.models';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'c-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	@Input() public click: void;
	@Input() public disabled: boolean;
	@Input() public class: string;
	@Input() public type: string;
	@Input() public variant: ButtonVariant;
	@Input() public size: ButtonSize;

	public setClasses(): ButtonClasses {
		return {
			btn: true,
			'btn--primary': this.variant === ButtonVariant.PRIMARY,
			'btn--secondary': this.variant === ButtonVariant.SECONDARY,
			'btn--primary-outline': this.variant === ButtonVariant.PRIMARY_OUTLINE,
			'btn--secondary-outline': this.variant === ButtonVariant.SECONDARY_OUTLINE,
			'btn--icon': this.variant === ButtonVariant.ICON,
			'btn--disabled': this.disabled,
			'btn--large': this.size === ButtonSize.LARGE,
			'btn--small': this.size === ButtonSize.SMALL,
		};
	}
}
