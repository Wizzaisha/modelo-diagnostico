import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmisions } from './list-submisions';

describe('ListSubmisions', () => {
  let component: ListSubmisions;
  let fixture: ComponentFixture<ListSubmisions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSubmisions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmisions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
