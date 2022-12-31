import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ButtonComponent } from '../../../ui-elements/button/button.component';
import { GoToTopComponent } from './go-to-top.component';

describe('GoToTopComponent', () => {
	let component: GoToTopComponent;
	let fixture: ComponentFixture<GoToTopComponent>;
	let fakeActionService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		fakeActionService = jasmine.createSpyObj('ActionsService', [
			'scrollToTheId',
		]);

		TestBed.configureTestingModule({
			declarations: [GoToTopComponent, ButtonComponent],
			providers: [
				{ provide: ActionsService, useValue: fakeActionService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GoToTopComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create GoToTopComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should scroll to top', () => {
		window.scroll({
			top: 100,
			left: 0,
		});
		fixture.detectChanges();

		component.goToTop();

		expect(window.scrollY).toEqual(0);
	});
});
