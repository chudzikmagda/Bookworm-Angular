import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from '../button/button.component';

describe('PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PaginationComponent, MockComponent(ButtonComponent)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
