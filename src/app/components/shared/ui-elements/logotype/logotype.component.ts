import { Component, Input } from '@angular/core';
import { LogotypeVersion } from './models/logotype.models';

@Component({
	selector: 'c-logotype',
	templateUrl: './logotype.component.html',
	styleUrls: ['./logotype.component.scss'],
})
export class LogotypeComponent {
	@Input() public version: LogotypeVersion | undefined;

	public readonly VERSION: typeof LogotypeVersion = LogotypeVersion;
}
