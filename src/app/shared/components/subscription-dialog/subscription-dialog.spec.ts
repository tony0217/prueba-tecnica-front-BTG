import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SubscriptionDialog } from './subscription-dialog';

describe('SubscriptionDialog', () => {
  let component: SubscriptionDialog;
  let fixture: ComponentFixture<SubscriptionDialog>;

  const mockFund = {
    id: '1',
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minAmount: 75000,
    category: 'FPV' as const,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionDialog, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { fund: mockFund } },
        { provide: MatDialogRef, useValue: { close: vi.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with fund minAmount', () => {
    expect(component.subscriptionForm.get('amount')?.value).toBe(75000);
  });

  it('should initialize notification as email', () => {
    expect(component.subscriptionForm.get('notification')?.value).toBe('email');
  });

  it('should set min amount', () => {
    component.setMin();
    expect(component.subscriptionForm.get('amount')?.value).toBe(mockFund.minAmount);
  });
});
