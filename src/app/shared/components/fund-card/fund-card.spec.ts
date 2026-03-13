import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { FundCard } from './fund-card';

describe('FundCard', () => {
  let component: FundCard;
  let fixture: ComponentFixture<FundCard>;

  const mockFund = {
    id: '1',
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minAmount: 75000,
    category: 'FPV' as const,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FundCard);
    component = fixture.componentInstance;
    component.fund = mockFund;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit actionClick when button is clicked', () => {
    const emitSpy = vi.spyOn(component.actionClick, 'emit');
    component.onActionClick();
    expect(emitSpy).toHaveBeenCalledWith(mockFund);
  });
});
