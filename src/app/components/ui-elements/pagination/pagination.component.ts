import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';

@Component({
	selector: 'c-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
	@Input() currentPage: number = 0;
	@Input() totalPages: number = 0;
	@Output() goToPage: EventEmitter<number> = new EventEmitter<number>();
	@Output() nextPage: EventEmitter<number> = new EventEmitter<number>();
	@Output() prevPage: EventEmitter<number> = new EventEmitter<number>();
	pages: number[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		const { currentPage, totalPages } = changes;
		if (
			(currentPage && currentPage.currentValue) ||
			(totalPages && totalPages.currentValue)
		) {
			this.pages = this.getPages(this.currentPage, this.totalPages);
		}
	}

	onGoToChange(page: number): void {
		this.goToPage.emit(page);
	}

	onNextPageChange(): void {
		this.nextPage.emit(this.currentPage);
	}

	onPrevPageChange(): void {
		this.prevPage.next(this.currentPage);
	}

	private getPages(current: number, total: number): number[] {
		if (total <= 8) {
			return [...Array(total).keys()].map(x => ++x);
		}

		if (current > 5) {
			if (current >= total - 4) {
				return [
					1,
					-1,
					total - 4,
					total - 3,
					total - 2,
					total - 1,
					total,
				];
			} else {
				return [1, -1, current - 1, current, current + 1, -1, total];
			}
		}

		return [1, 2, 3, 4, 5, -1, total];
	}
}
