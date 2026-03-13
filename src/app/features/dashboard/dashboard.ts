import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BalanceCard } from '../../shared/components/balance-card/balance-card';
import { TransactionRow } from '../../shared/components/transaction-row/transaction-row';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { BalanceService } from '../../core/services/balance';
import { TransactionService } from '../../core/services/transaction';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule, BalanceCard, TransactionRow, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private balanceService = inject(BalanceService);
  private transactionService = inject(TransactionService);

  balance = this.balanceService.balance;
  transactions$ = this.transactionService.getTransactions();
}
