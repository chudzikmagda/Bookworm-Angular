import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { LogotypeComponent } from '../ui-elements/logotype/logotype.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		fakeActionsService = jasmine.createSpyObj('ActionsService', [
			'openDialog',
		]);

		TestBed.configureTestingModule({
			declarations: [HeaderComponent, LogotypeComponent, ButtonComponent],
			providers: [
				{ provide: ActionsService, useValue: fakeActionsService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create HeaderComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should open dialog on button click', () => {
		const button: HTMLElement = fixture.debugElement.query(
			By.directive(ButtonComponent)
		).nativeElement;
		const modalPath: string = 'add-new-book';

		button.click();

		expect(fakeActionsService.openDialog).toHaveBeenCalledOnceWith(
			modalPath
		);
	});
});
