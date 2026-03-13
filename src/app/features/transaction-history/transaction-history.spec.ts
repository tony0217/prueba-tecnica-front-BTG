import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TransactionHistory } from './transaction-history';

describe('TransactionHistory', () => {
  let component: TransactionHistory;
  let fixture: ComponentFixture<TransactionHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistory, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with ALL filter', () => {
    expect(component.activeFilter).toBe('ALL');
  });

  it('should filter subscriptions', () => {
    component.transactions = [
      { id: '1', fundId: '1', fundName: 'Fund A', type: 'subscription', amount: 100000, date: '2025-01-01' },
      { id: '2', fundId: '2', fundName: 'Fund B', type: 'cancellation', amount: 50000, date: '2025-01-02' }
    ];
    component.applyFilter('SUBSCRIPTION');
    expect(component.filteredTransactions.length).toBe(1);
    expect(component.filteredTransactions[0].type).toBe('subscription');
  });

  it('should filter cancellations', () => {
    component.transactions = [
      { id: '1', fundId: '1', fundName: 'Fund A', type: 'subscription', amount: 100000, date: '2025-01-01' },
      { id: '2', fundId: '2', fundName: 'Fund B', type: 'cancellation', amount: 50000, date: '2025-01-02' }
    ];
    component.applyFilter('CANCELLATION');
    expect(component.filteredTransactions.length).toBe(1);
    expect(component.filteredTransactions[0].type).toBe('cancellation');
  });
});
