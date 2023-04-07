import { Component, Input } from '@angular/core';
import { BookStats } from '../../models/summary.models';

@Component({
	selector: 'c-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
	@Input() public stats: BookStats;
}
