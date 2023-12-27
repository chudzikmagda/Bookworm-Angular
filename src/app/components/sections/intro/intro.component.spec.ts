import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { IntroComponent } from './intro.component';
import { MockComponents } from 'ng-mocks';
import { ButtonComponent } from '../../shared/ui-elements/button/button.component';
import { SectionNames } from 'src/app/models/models';

describe('IntroComponent', () => {
	let component: IntroComponent;
	let fixture: ComponentFixture<IntroComponent>;
	let fakeActionsService: ActionsService;

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', ['scrollToTheId']);

		TestBed.configureTestingModule({
			declarations: [IntroComponent, MockComponents(ButtonComponent)],
			providers: [
				{
					provide: ActionsService,
					useValue: fakeActionsService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(IntroComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create IntroComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should set section name', () => {
		const section: HTMLElement = fixture.debugElement.query(By.css('.section--intro')).nativeElement;

		expect(section.id).toEqual(SectionNames.INTRO);
	});

	it('should scroll to the summary section', () => {
		component.goToSummary();

		fixture.detectChanges();

		expect(window.dispatchEvent(new Event('scroll'))).toBeTrue;
		expect(fakeActionsService.scrollToTheId).toHaveBeenCalledTimes(1);
	});
});
