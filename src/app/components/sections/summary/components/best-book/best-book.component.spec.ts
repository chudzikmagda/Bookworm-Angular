import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookData } from 'src/app/components/shared/models/models';
import { ActionsService } from 'src/app/services/actions/actions.service';
import { ApiService } from 'src/app/services/api/api.service';
import { BestBookComponent } from './best-book.component';

describe('BestBookComponent', () => {
	let component: BestBookComponent;
	let fixture: ComponentFixture<BestBookComponent>;
	let fakeApiService: jasmine.SpyObj<ApiService>;
	let fakeActionsService: jasmine.SpyObj<ActionsService>;

	beforeEach(() => {
		fakeApiService = jasmine.createSpyObj('ApiService', ['getBookData']);

		fakeActionsService = jasmine.createSpyObj('ActionsService', [
			'bestBook',
		]);

		fakeApiService.getBookData.and.returnValue(of(bookList()));
		fakeActionsService.bestBook.and.returnValue(bestBook());

		TestBed.configureTestingModule({
			declarations: [BestBookComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [
				{
					provider: ApiService,
					useValue: fakeApiService,
				},
				{
					provider: ActionsService,
					useValue: fakeActionsService,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(BestBookComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create BestBookComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should get best book on init', done => {
		fakeApiService.getBookData().subscribe((books: BookData[]) => {
			component.bestBook = fakeActionsService.bestBook(books);

			expect(books).toEqual(books);
			expect(books.length).toBeGreaterThan(0);
			expect(component.bestBook).toEqual(bestBook());
			done();
		});
	});
});

const bestBook = (): BookData => {
	return {
		author: 'The Help',
		cover: 'assets/images/book_covers/help-stockett.jpg',
		date_add: 'September 14, 2022, 3:53 pm',
		date_edit: 'September 15, 2022, 3:53 pm',
		description: 'Lorem ipsum',
		id: 7,
		language: 'English',
		rating: 9.5,
		title: 'Kathryn Stockett',
	};
};

const bookList = (): BookData[] => {
	return [
		{
			author: 'Sample book',
			cover: 'assets/images/book_covers/help-stockett.jpg',
			date_add: 'September 14, 2022, 3:53 pm',
			date_edit: 'September 15, 2022, 3:53 pm',
			description: 'Lorem ipsum',
			id: 7,
			language: 'English',
			rating: 9.5,
			title: 'Kathryn Stockett',
		},
		{
			author: 'Lorem ipsum',
			cover: 'assets/images/book_covers/help-stockett.jpg',
			date_add: 'September 14, 2022, 3:53 pm',
			date_edit: 'September 15, 2022, 3:53 pm',
			description: 'Lorem ipsum',
			id: 7,
			language: 'English',
			rating: 5.5,
			title: 'Kathryn Stockett',
		},
	];
};
