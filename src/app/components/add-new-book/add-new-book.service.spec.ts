import { TestBed } from '@angular/core/testing';

import { AddNewBookService } from './add-new-book.service';

describe('AddNewBookService', () => {
  let service: AddNewBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
