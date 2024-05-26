import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BookStats } from '../../models/summary.models';

@Component({
	selector: 'c-stats',
	templateUrl: './stats.component.html',
	styleUrl: './stats.component.scss',
	standalone: true,
	imports: [DecimalPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
	@Input() public stats: BookStats;
}
