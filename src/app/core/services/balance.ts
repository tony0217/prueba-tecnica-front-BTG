import { Injectable, signal, inject } from '@angular/core';
import { UserBalance } from '../models/user-balance.model';
import { TransactionService } from './transaction';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private transactionService = inject(TransactionService);
  private startingCash = 500000;
  private initialBalance: UserBalance = { available: this.startingCash, invested: 0 };
  readonly balance = signal<UserBalance>(this.initialBalance);

  constructor() {
    this.refreshBalance();
  }

  /**
   * Recalculates the balance based on the full transaction history from the database.
   * This ensures the state is always consistent and avoids manual tracking errors.
   */
  refreshBalance() {
    this.transactionService.getTransactions().subscribe(transactions => {
      let totalSubscriptions = 0;
      let totalCancellations = 0;

      transactions.forEach(tx => {
        if (tx.type === 'subscription') {
          totalSubscriptions += tx.amount;
        } else if (tx.type === 'cancellation') {
          totalCancellations += tx.amount;
        }
      });

      const invested = totalSubscriptions - totalCancellations;
      const available = this.startingCash - invested;

      const newState = { available, invested };
      this.balance.set(newState);
      // Persist for faster initial load next time (optional but good for UX)
      localStorage.setItem('btg_balance', JSON.stringify(newState));
    });
  }

  deductAvailable(amount: number): boolean {
    if (this.balance().available >= amount) {
      // In a real app, we'd wait for the API, but for this test
      // we update local state immediately and then re-sync
      const current = this.balance();
      const newState = {
        available: current.available - amount,
        invested: current.invested + amount
      };
      this.balance.set(newState);
      localStorage.setItem('btg_balance', JSON.stringify(newState));
      return true;
    }
    return false;
  }

  addAvailable(amount: number): void {
    const current = this.balance();
    const newState = {
      available: current.available + amount,
      invested: current.invested - amount
    };
    this.balance.set(newState);
    localStorage.setItem('btg_balance', JSON.stringify(newState));
  }
}
