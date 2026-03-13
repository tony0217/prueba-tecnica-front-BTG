import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { TransactionService } from '../../core/services/transaction';
import { BalanceService } from '../../core/services/balance';
import { Transaction } from '../../core/models/transaction.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-my-investments',
  imports: [CommonModule, RouterModule, MatIconModule, Sidebar, CurrencyFormatPipe],
  templateUrl: './my-investments.html',
  styleUrl: './my-investments.scss',
})
export class MyInvestments implements OnInit {
  private transactionService = inject(TransactionService);
  private balanceService = inject(BalanceService);

  activeInvestments: { fundId: string; fundName: string; amount: number; date: string }[] = [];
  balance = this.balanceService.balance;

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(transactions => {
      // Grouping transactions to find active subscriptions 
      // Simplified: Just showing all subscriptions that haven't been fully cancelled yet.
      // In a real app we would aggregate by fundId or rely on a "funds balance" API.
      // Let's manually aggregate the amount per fundId for this test based on deposits/withdrawals.

      const fundBalances = new Map<string, { fundName: string; amount: number; date: string }>();

      transactions.forEach(tx => {
        if (tx.type === 'subscription') {
          const existing = fundBalances.get(tx.fundId);
          if (existing) {
            existing.amount += tx.amount;
          } else {
            fundBalances.set(tx.fundId, { 
              fundName: tx.fundName, 
              amount: tx.amount, 
              date: tx.date 
            });
          }
        } else if (tx.type === 'cancellation') {
          const existing = fundBalances.get(tx.fundId);
          if (existing) {
            existing.amount -= tx.amount;
            if (existing.amount <= 0) {
              fundBalances.delete(tx.fundId);
            }
          }
        }
      });

      this.activeInvestments = Array.from(fundBalances.entries()).map(([fundId, data]) => ({
        fundId,
        ...data
      }));
    });
  }

  cancelSubscription(investment: any) {
    if (confirm(`¿Estás seguro que deseas cancelar tu suscripción al fondo ${investment.fundName}? \nEl dinero será reembolsado a tu saldo disponible.`)) {
      this.transactionService.addTransaction({
        fundId: investment.fundId,
        fundName: investment.fundName,
        type: 'cancellation',
        amount: investment.amount,
        date: new Date().toISOString(),
      }).subscribe(() => {
        // Return amount to available balance
        this.balanceService.addAvailable(investment.amount);
        
        // Remove from local list
        this.activeInvestments = this.activeInvestments.filter(i => i.fundId !== investment.fundId);
      });
    }
  }
}
