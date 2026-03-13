import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvestments } from './my-investments';

describe('MyInvestments', () => {
  let component: MyInvestments;
  let fixture: ComponentFixture<MyInvestments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInvestments],
    }).compileComponents();

    fixture = TestBed.createComponent(MyInvestments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
