import { Component } from '@angular/core';

@Component({
	selector: 'c-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	public logotypeVersion: 'small' | undefined = 'small';
}
