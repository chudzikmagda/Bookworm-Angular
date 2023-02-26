import { AppComponent } from './app.component';
import { ActionsService } from './services/actions/actions.service';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents, MockProvider } from 'ng-mocks';
import { HeaderComponent } from './components/header/header.component';
import { IntroComponent } from './components/sections/intro/intro.component';
import { SummaryComponent } from './components/sections/summary/summary.component';
import { BooksComponent } from './components/sections/books/books.component';
import { MotivateQuoteComponent } from './components/sections/motivational-quote/motivational-quote.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookData } from './models/models';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

const bookDataMock = (): BookData[] => {
	return [
		{
			id: 1,
			author: 'fakeAuthor',
			title: 'fakeTitle',
			language: 'fakeLang',
			description: 'fakeDescription',
			rating: 10,
			date_add: '10 November 2022',
			cover: 'fakeVover.jpg',
		},
	];
};

const mockActionsService = {
	getBookListFromApi: jasmine.createSpy().and.returnValue(of(bookDataMock())),
};

describe('AppComponent', () => {
	let spectator: Spectator<AppComponent>;

	const createComponent = createComponentFactory({
		component: AppComponent,
		imports: [HttpClientTestingModule, RouterTestingModule],
		declarations: [
			MockComponents(
				HeaderComponent,
				IntroComponent,
				SummaryComponent,
				BooksComponent,
				MotivateQuoteComponent,
				FooterComponent,
				AppComponent
			),
		],
		providers: [MockProvider(ActionsService, mockActionsService)],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should load sample books on init', fakeAsync(() => {
		tick();
		expect(mockActionsService.getBookListFromApi).toHaveBeenCalledTimes(1);
	}));
});
