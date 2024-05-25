import { TestBed } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActionsService', () => {
	let service: ActionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
		service = TestBed.inject(ActionsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
