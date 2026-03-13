import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsExplorer } from './funds-explorer';

describe('FundsExplorer', () => {
  let component: FundsExplorer;
  let fixture: ComponentFixture<FundsExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsExplorer],
    }).compileComponents();

    fixture = TestBed.createComponent(FundsExplorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
