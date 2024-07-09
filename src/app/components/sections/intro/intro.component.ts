import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { SectionNames } from 'src/app/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { DialogService } from '../../shared/ui-elements/dialog/services/dialog.service';
import { AddNewBookComponent } from '../../shared/add-new-book/add-new-book.component';
import { ButtonSize, ButtonVariant } from '../../shared/ui-elements/button/models/button.models';
import { ButtonComponent } from '../../shared/ui-elements/button/button.component';

@Component({
	selector: 'c-intro',
	templateUrl: './intro.component.html',
	styleUrl: './intro.component.scss',
	standalone: true,
	imports: [ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
	@ViewChild('addNewBookDialog', { read: ViewContainerRef }) public addNewBookDialog!: ViewContainerRef;
	public readonly SECTION_NAME: typeof SectionNames = SectionNames;
	public readonly BUTTON_SIZE: typeof ButtonSize = ButtonSize;
	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;

	private actionService: ActionsService = inject(ActionsService);
	private dialogService: DialogService = inject(DialogService);

	public goToSummary(): void {
		this.actionService.scrollToTheId(SectionNames.SUMMARY);
	}

	public openDialog(): void {
		this.dialogService.openDialog(this.addNewBookDialog, AddNewBookComponent);
	}
}
