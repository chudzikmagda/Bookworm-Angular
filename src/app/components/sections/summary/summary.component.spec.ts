import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
	let component: SummaryComponent;
	let fixture: ComponentFixture<SummaryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SummaryComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create SummaryComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set section name', () => {
		const section: HTMLElement = fixture.debugElement.query(
			By.css('.section--summary')
		).nativeElement;

		expect(section.id).toEqual(component.sectionName.Summary);
	});
});
