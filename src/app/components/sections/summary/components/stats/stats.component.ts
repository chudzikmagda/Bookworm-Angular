import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookStats } from '../../models/summary.models';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'c-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
	@Input() public stats: BookStats;
}
