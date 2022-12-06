import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DialogService } from './service/dialog.service';

@Component({
	selector: 'c-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('200ms ease-in-out', style({ opacity: 1 })),
			]),
			transition(':leave', [
				animate('200ms ease-in-out', style({ opacity: 0 })),
			]),
		]),
		trigger('slideInOut', [
			transition(':enter', [
				style({ transform: 'translateY(100%)' }),
				animate(
					'500ms ease-in-out',
					style({ transform: 'translateY(0%)' })
				),
			]),
			transition(':leave', [
				animate(
					'200ms ease-in-out',
					style({ transform: 'translateY(100%)' })
				),
			]),
		]),
	],
})
export class DialogComponent {
	@Input() variant: 'center' | 'bottom' = 'bottom';
	@Input() visible = true;
	@Output() visibleChange: EventEmitter<boolean> =
		new EventEmitter<boolean>();

	constructor(private dialogService: DialogService) {}

	setClasses() {
		return {
			dialog: true,
			'dialog--bottom': this.variant === 'bottom',
			'dialog--center': this.variant === 'center',
		};
	}

	closeDialog() {
		this.visible = false;
		this.dialogService.closeDialog(this.visible, this.visibleChange);
	}
}
