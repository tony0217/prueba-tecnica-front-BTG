import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionRow } from './transaction-row';
import { Transaction } from '../../../core/models/transaction.model';

describe('TransactionRow', () => {
  let component: TransactionRow;
  let fixture: ComponentFixture<TransactionRow>;

  const mockTransaction: Transaction = {
    id: '1',
    fundId: '1',
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    type: 'subscription',
    amount: 75000,
    date: '2025-01-15'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionRow],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionRow);
    component = fixture.componentInstance;
    component.transaction = mockTransaction;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
