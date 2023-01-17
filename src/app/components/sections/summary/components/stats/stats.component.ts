import { Component, Input } from '@angular/core';
import { BookStats } from '../../models/models';

@Component({
	selector: 'c-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
	@Input() stats: BookStats;
}
