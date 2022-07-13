import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAddedBookComponent } from './last-added-book.component';

describe('LastAddedBookComponent', () => {
  let component: LastAddedBookComponent;
  let fixture: ComponentFixture<LastAddedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAddedBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAddedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
