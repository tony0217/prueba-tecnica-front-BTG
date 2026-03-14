import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { TransactionService } from '../../core/services/transaction';
import { BalanceService } from '../../core/services/balance';
import { FundsService } from '../../core/services/funds';
import { Transaction } from '../../core/models/transaction.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format-pipe';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center';
import { NotificationService } from '../../core/services/notification';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-investments',
  imports: [CommonModule, RouterModule, MatIconModule, MatDialogModule, Sidebar, NotificationCenterComponent, CurrencyFormatPipe],
  templateUrl: './my-investments.html',
  styleUrl: './my-investments.scss',
})
export class MyInvestments implements OnInit {
  private transactionService = inject(TransactionService);
  private balanceService = inject(BalanceService);
  private fundsService = inject(FundsService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  activeInvestments: { fundId: string; fundName: string; amount: number; date: string; category?: string }[] = [];
  balance = this.balanceService.balance;

  ngOnInit() {
    forkJoin({
      transactions: this.transactionService.getTransactions(),
      funds: this.fundsService.getFunds()
    }).subscribe(({ transactions, funds }) => {
      const fundBalances = new Map<string, { fundName: string; amount: number; date: string; category?: string }>();

      transactions.forEach(tx => {
        if (tx.type === 'subscription') {
          const existing = fundBalances.get(tx.fundId);
          if (existing) {
            existing.amount += tx.amount;
          } else {
            const fund = funds.find(f => f.id === tx.fundId);
            fundBalances.set(tx.fundId, { 
              fundName: tx.fundName, 
              amount: tx.amount, 
              date: tx.date,
              category: fund?.category
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
      this.cdr.detectChanges();
    });
  }

  cancelSubscription(investment: any) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: {
        title: 'Cancelar Suscripción',
        message: `¿Estás seguro que deseas cancelar tu suscripción al fondo ${investment.fundName}?`,
        submessage: 'El dinero será reembolsado a tu saldo disponible.'
      },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.addTransaction({
          fundId: investment.fundId,
          fundName: investment.fundName,
          type: 'cancellation',
          amount: investment.amount,
          date: new Date().toISOString(),
        }).subscribe(() => {
          this.notificationService.notify('sms', investment.fundName, investment.amount, 'cancellation');
          // Return amount to available balance
          this.balanceService.addAvailable(investment.amount);
          
          // Remove from local list
          this.activeInvestments = this.activeInvestments.filter(i => i.fundId !== investment.fundId);
          this.cdr.detectChanges();
        });
      }
    });
  }
}
