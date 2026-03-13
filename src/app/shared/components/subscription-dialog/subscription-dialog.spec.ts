import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDialog } from './subscription-dialog';

describe('SubscriptionDialog', () => {
  let component: SubscriptionDialog;
  let fixture: ComponentFixture<SubscriptionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
