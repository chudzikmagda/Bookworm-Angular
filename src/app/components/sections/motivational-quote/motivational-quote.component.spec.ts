import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivateQuoteComponent } from './motivational-quote.component';

describe('MotivateQuoteComponent', () => {
	let component: MotivateQuoteComponent;
	let fixture: ComponentFixture<MotivateQuoteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MotivateQuoteComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MotivateQuoteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
