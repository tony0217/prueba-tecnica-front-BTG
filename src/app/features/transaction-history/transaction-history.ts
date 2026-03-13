import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { TransactionService } from '../../core/services/transaction';
import { Transaction } from '../../core/models/transaction.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule, MatIconModule, Sidebar, CurrencyFormatPipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss',
})
export class TransactionHistory implements OnInit {
  private transactionService = inject(TransactionService);

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  activeFilter: 'ALL' | 'SUBSCRIPTION' | 'CANCELLATION' = 'ALL';

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(txs => {
      // Sort by date descending
      this.transactions = txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.applyFilter('ALL');
    });
  }

  applyFilter(filter: 'ALL' | 'SUBSCRIPTION' | 'CANCELLATION') {
    this.activeFilter = filter;
    if (filter === 'ALL') {
      this.filteredTransactions = [...this.transactions];
    } else {
      const type = filter === 'SUBSCRIPTION' ? 'subscription' : 'cancellation';
      this.filteredTransactions = this.transactions.filter(t => t.type === type);
    }
  }
}
