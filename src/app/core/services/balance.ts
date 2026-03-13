import { Injectable, signal } from '@angular/core';
import { UserBalance } from '../models/user-balance.model';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private initialBalance: UserBalance = { available: 500000, invested: 0 };
  readonly balance = signal<UserBalance>(this.initialBalance);

  deductAvailable(amount: number): boolean {
    if (this.balance().available >= amount) {
      this.balance.update((state) => ({
        available: state.available - amount,
        invested: state.invested + amount
      }));
      return true;
    }
    return false;
  }

  addAvailable(amount: number): void {
    this.balance.update((state) => ({
      available: state.available + amount,
      invested: state.invested - amount
    }));
  }
}
