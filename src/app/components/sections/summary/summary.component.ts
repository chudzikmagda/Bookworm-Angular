import { Component } from '@angular/core';
import { SectionNames } from 'src/app/models/models';

@Component({
	selector: 'c-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
	sectionName: typeof SectionNames = SectionNames;
}
