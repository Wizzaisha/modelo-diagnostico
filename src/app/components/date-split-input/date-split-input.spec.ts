import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSplitInput } from './date-split-input';

describe('DateSplitInput', () => {
  let component: DateSplitInput;
  let fixture: ComponentFixture<DateSplitInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSplitInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSplitInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
