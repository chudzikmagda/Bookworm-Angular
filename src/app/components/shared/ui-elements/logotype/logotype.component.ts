import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LogotypeVersion } from './models/logotype.models';

@Component({
	selector: 'c-logotype',
	templateUrl: './logotype.component.html',
	styleUrls: ['./logotype.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogotypeComponent {
	@Input() public version: LogotypeVersion | undefined;

	public readonly VERSION: typeof LogotypeVersion = LogotypeVersion;
}
