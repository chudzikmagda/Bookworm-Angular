import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { MockComponents } from 'ng-mocks';
import { ButtonComponent } from 'src/app/components/shared/ui-elements/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/components/shared/ui-elements/input/input.component';

describe('SearchBarComponent', () => {
	let component: SearchBarComponent;
	let fixture: ComponentFixture<SearchBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchBarComponent, MockComponents(ButtonComponent, InputComponent)],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
