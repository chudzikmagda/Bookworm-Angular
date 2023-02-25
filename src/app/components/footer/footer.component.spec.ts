import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ButtonComponent } from '../shared/ui-elements/button/button.component';
import { LogotypeComponent } from '../shared/ui-elements/logotype/logotype.component';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;
	let fakeActionService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				FooterComponent,
				LogotypeComponent,
				GoToTopComponent,
				ButtonComponent,
			],
			providers: [
				{
					provide: ActionsService,
					useValue: fakeActionService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create FooterComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should create footer with small logotype', () => {
		const logotype: HTMLElement = fixture.debugElement.query(
			By.directive(LogotypeComponent)
		).nativeElement;

		component.logotypeVersion = 'small';
		fixture.detectChanges();

		expect(logotype.hasAttribute('ng-reflect-version')).toBeTrue();
		expect(logotype.getAttribute('ng-reflect-version')).toEqual('small');
	});
});
