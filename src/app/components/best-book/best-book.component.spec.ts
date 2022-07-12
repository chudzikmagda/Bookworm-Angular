import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestBookComponent } from './best-book.component';

describe('BestBookComponent', () => {
  let component: BestBookComponent;
  let fixture: ComponentFixture<BestBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
