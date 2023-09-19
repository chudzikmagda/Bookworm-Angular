import { Component } from '@angular/core';
import { LogotypeVersion } from '../shared/ui-elements/logotype/models/logotype.models';

@Component({
	selector: 'c-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	public logotypeVersion: LogotypeVersion | undefined = LogotypeVersion.SMALL;
}
