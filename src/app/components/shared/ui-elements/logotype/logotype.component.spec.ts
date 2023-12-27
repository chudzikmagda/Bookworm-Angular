import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogotypeComponent } from './logotype.component';
import { LogotypeVersion } from './models/logotype.models';

describe('LogotypeComponent', () => {
	let component: LogotypeComponent;
	let fixture: ComponentFixture<LogotypeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LogotypeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LogotypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create LogotypeComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should create small version of LogotypeComponent', () => {
		component.version = LogotypeVersion.SMALL;
		fixture.detectChanges();

		const logotype: DebugElement = fixture.debugElement.query(By.css('.logotype'));

		expect(logotype.classes['logotype']).toBeTrue();
		expect(logotype.classes['logotype__small']).toBeTrue();
	});

	it('should create default version of LogotypeComponent', () => {
		const logotype: DebugElement = fixture.debugElement.query(By.css('.logotype'));

		expect(logotype.classes['logotype']).toBeTrue();
		expect(logotype.classes['logotype__small']).not.toBeTrue();
	});
});
