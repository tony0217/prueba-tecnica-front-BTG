import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TransactionRow } from '../../shared/components/transaction-row/transaction-row';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center';
import { BalanceService } from '../../core/services/balance';
import { TransactionService } from '../../core/services/transaction';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format-pipe';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatIconModule, TransactionRow, Sidebar, NotificationCenterComponent, CurrencyFormatPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private balanceService = inject(BalanceService);
  private transactionService = inject(TransactionService);

  balance = this.balanceService.balance;
  transactions$ = this.transactionService.getTransactions().pipe(
    map(transactions => [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ))
  );
}
