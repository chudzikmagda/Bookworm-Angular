import { TestBed } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionsService', () => {
	let service: ActionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(ActionsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
