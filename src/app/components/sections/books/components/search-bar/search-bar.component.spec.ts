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

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should create search form on init', () => {
		expect(component.searchForm.get('input')).not.toBeNull();
		expect(component.searchForm.value.input).toBeFalsy();
	});

	it('should emit a filteredBook event with data when search button is clicked', () => {
		const inputValue: string = 'Test Value';
		const spyEventEmitter: jasmine.Spy = spyOn(component.filteredBook, 'emit');
		component.searchForm.get('input')?.setValue(inputValue);

		component.onSearchBtnClick();

		expect(component.searchForm.get('input')?.getRawValue()).toBe(inputValue);
		expect(spyEventEmitter).toHaveBeenCalledWith(inputValue);
	});
});
