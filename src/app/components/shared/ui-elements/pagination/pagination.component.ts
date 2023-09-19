import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonVariant } from '../button/models/button.models';

@Component({
	selector: 'c-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
	@Input() public currentPage: number = 0;
	@Input() public totalPages: number = 0;
	@Output() public goToPage: EventEmitter<number> = new EventEmitter<number>();
	@Output() public nextPage: EventEmitter<number> = new EventEmitter<number>();
	@Output() public prevPage: EventEmitter<number> = new EventEmitter<number>();

	public readonly BUTTON_VARIANT: typeof ButtonVariant = ButtonVariant;
	public pages: number[] = [];

	public ngOnChanges(changes: SimpleChanges): void {
		const { currentPage, totalPages } = changes;
		if ((currentPage && currentPage.currentValue) || (totalPages && totalPages.currentValue)) {
			this.pages = this.getPages(this.currentPage, this.totalPages);
		}
	}

	public onGoToChange(page: number): void {
		this.goToPage.emit(page);
	}

	public onNextPageChange(): void {
		this.nextPage.emit(this.currentPage);
	}

	public onPrevPageChange(): void {
		this.prevPage.next(this.currentPage);
	}

	private getPages(current: number, total: number): number[] {
		if (total <= 8) {
			return [...Array(total).keys()].map(x => ++x);
		}

		if (current > 5) {
			if (current >= total - 4) {
				return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
			} else {
				return [1, -1, current - 1, current, current + 1, -1, total];
			}
		}

		return [1, 2, 3, 4, 5, -1, total];
	}
}
