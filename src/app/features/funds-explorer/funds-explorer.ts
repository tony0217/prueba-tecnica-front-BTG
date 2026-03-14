import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FundCard } from '../../shared/components/fund-card/fund-card';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center';
import { FundsService } from '../../core/services/funds';
import { Fund } from '../../core/models/fund.model';
import { SubscriptionDialog } from '../../shared/components/subscription-dialog/subscription-dialog';
import { TransactionService } from '../../core/services/transaction';
import { BalanceService } from '../../core/services/balance';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-funds-explorer',
  imports: [CommonModule, RouterModule, MatIconModule, FundCard, Sidebar, NotificationCenterComponent],
  templateUrl: './funds-explorer.html',
  styleUrl: './funds-explorer.scss',
})
export class FundsExplorer implements OnInit {
  private fundsService = inject(FundsService);
  private transactionService = inject(TransactionService);
  private balanceService = inject(BalanceService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  funds: Fund[] = [];
  filteredFunds: Fund[] = [];
  activeFilter: 'ALL' | 'FPV' | 'FIC' = 'ALL';

  ngOnInit() {
    this.fundsService.getFunds().subscribe((funds) => {
      this.funds = funds;
      this.applyFilter('ALL');
      this.cdr.detectChanges();
    });
  }

  applyFilter(filter: 'ALL' | 'FPV' | 'FIC') {
    this.activeFilter = filter;
    this.filterFunds();
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filterFunds(query);
  }

  private filterFunds(query: string = '') {
    let result = this.funds;
    
    if (this.activeFilter !== 'ALL') {
      result = result.filter(f => f.category === this.activeFilter);
    }
    
    if (query) {
      result = result.filter(f => 
        f.name.toLowerCase().includes(query) || 
        f.category.toLowerCase().includes(query)
      );
    }
    
    this.filteredFunds = result;
  }

  openSubscriptionDialog(fund: Fund) {
    const dialogRef = this.dialog.open(SubscriptionDialog, {
      data: { fund },
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'subscription-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.balanceService.deductAvailable(result.amount)) {
          this.transactionService.addTransaction({
            fundId: fund.id,
            fundName: fund.name,
            type: 'subscription',
            amount: result.amount,
            date: new Date().toISOString(),
            notificationMethod: result.notification
          }).subscribe(() => {
            this.notificationService.notify(result.notification, fund.name, result.amount, 'subscription');
          });
        }
      }
    });
  }
}
