import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from 'src/app/components/shared/ui-elements/button/button.component';
import { ButtonVariant } from 'src/app/components/shared/ui-elements/button/models/button.models';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
	selector: 'c-go-to-top',
	templateUrl: './go-to-top.component.html',
	styleUrl: './go-to-top.component.scss',
	standalone: true,
	imports: [ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoToTopComponent {
	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;

	constructor(private readonly actionService: ActionsService) {}

	public goToTop(): void {
		this.actionService.scrollToTheId('header');
	}
}
