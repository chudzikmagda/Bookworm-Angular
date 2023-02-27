import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents } from 'ng-mocks';
import { ButtonComponent } from '../shared/ui-elements/button/button.component';
import { DialogService } from '../shared/ui-elements/dialog/services/dialog.service';
import { LogotypeComponent } from '../shared/ui-elements/logotype/logotype.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let fakeDialogService: jasmine.SpyObj<DialogService>;

	beforeEach(() => {
		fakeDialogService = jasmine.createSpyObj('DialogService', [
			'openDialog',
		]);

		TestBed.configureTestingModule({
			declarations: [
				HeaderComponent,
				MockComponents(LogotypeComponent, ButtonComponent),
			],
			providers: [
				{ provide: DialogService, useValue: fakeDialogService },
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

		expect(fakeDialogService.openDialog).toHaveBeenCalledOnceWith(
			modalPath
		);
	});
});
