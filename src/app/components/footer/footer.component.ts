import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogotypeVersion } from '../shared/ui-elements/logotype/models/logotype.models';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';
import { LogotypeComponent } from '../shared/ui-elements/logotype/logotype.component';

@Component({
	selector: 'c-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	standalone: true,
	imports: [GoToTopComponent, LogotypeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	public readonly LOGOTYPE_VERSION: typeof LogotypeVersion = LogotypeVersion;
}
