import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DialogClasses } from './models/dialog.models';
import { DialogService } from './services/dialog.service';

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
			transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0 }))]),
		]),
		trigger('slideInOut', [
			transition(':enter', [
				style({ transform: 'translateY(100%)' }),
				animate('500ms ease-in-out', style({ transform: 'translateY(0%)' })),
			]),
			transition(':leave', [animate('200ms ease-in-out', style({ transform: 'translateY(100%)' }))]),
		]),
	],
})
export class DialogComponent implements OnInit, OnDestroy {
	@Input() public variant: 'center' | 'bottom' = 'bottom';

	constructor(private readonly dialogService: DialogService, private readonly renderer: Renderer2) {}

	public ngOnInit(): void {
		this.renderer.addClass(document.body, 'dialog-open');
	}

	public setClasses(): DialogClasses {
		return {
			dialog: true,
			'dialog--bottom': this.variant === 'bottom',
			'dialog--center': this.variant === 'center',
		};
	}

	public closeDialog(): void {
		this.dialogService.closeDialog();
	}

	public ngOnDestroy(): void {
		this.renderer.removeClass(document.body, 'dialog-open');
	}
}
