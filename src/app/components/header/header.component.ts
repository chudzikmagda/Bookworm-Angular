import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from '../shared/ui-elements/dialog/services/dialog.service';
import { AddNewBookComponent } from '../shared/add-new-book/add-new-book.component';
import { ButtonVariant } from '../shared/ui-elements/button/models/button.models';
import { ButtonComponent } from '../shared/ui-elements/button/button.component';
import { LogotypeComponent } from '../shared/ui-elements/logotype/logotype.component';

@Component({
	selector: 'c-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	standalone: true,
	imports: [ButtonComponent, LogotypeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@ViewChild('addNewBookDialog', { read: ViewContainerRef }) public addNewBookDialog!: ViewContainerRef;

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;

	constructor(private readonly dialogService: DialogService) {}

	public openDialog(): void {
		this.dialogService.openDialog(this.addNewBookDialog, AddNewBookComponent);
	}
}
