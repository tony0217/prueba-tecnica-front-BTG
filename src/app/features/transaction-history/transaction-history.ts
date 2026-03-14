import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center';
import { TransactionService } from '../../core/services/transaction';
import { Transaction } from '../../core/models/transaction.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format-pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-history',
  imports: [
    CommonModule, 
    RouterModule, 
    MatIconModule, 
    Sidebar, 
    NotificationCenterComponent, 
    CurrencyFormatPipe,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss',
})
export class TransactionHistory implements OnInit {
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  paginatedTransactions: Transaction[] = [];
  activeFilter: 'ALL' | 'SUBSCRIPTION' | 'CANCELLATION' = 'ALL';

  // Pagination
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  isPrinting = false;

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(txs => {
      // Sort by date descending
      this.transactions = txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.applyFilter('ALL');
      this.cdr.detectChanges();
    });
  }

  applyFilter(filter: 'ALL' | 'SUBSCRIPTION' | 'CANCELLATION') {
    this.activeFilter = filter;
    if (filter === 'ALL') {
      this.filteredTransactions = this.transactions;
    } else {
      const type = filter === 'SUBSCRIPTION' ? 'subscription' : 'cancellation';
      this.filteredTransactions = this.transactions.filter(t => t.type === type);
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.pageSize) || 1;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTransactions = this.filteredTransactions.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get startRange(): number {
    return this.filteredTransactions.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRange(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.filteredTransactions.length ? this.filteredTransactions.length : end;
  }

  downloadTransactions(format: 'excel' | 'pdf') {
    if (this.filteredTransactions.length === 0) {
      this.snackBar.open('No hay transacciones para descargar', 'Cerrar', { duration: 3000 });
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `Transacciones_BTG_${timestamp}`;
    
    if (format === 'excel') {
      const headers = ['Fecha', 'Hora', 'Fondo', 'Tipo', 'Monto'];
      
      const rows = this.filteredTransactions.map(tx => {
        const dateObj = new Date(tx.date);
        return [
          `"${dateObj.toLocaleDateString()}"`,
          `"${dateObj.toLocaleTimeString()}"`,
          `"${tx.fundName}"`,
          `"${tx.type === 'subscription' ? 'Suscripción' : 'Cancelación'}"`,
          `"${tx.amount}"`
        ];
      });
      
      const csvContent = "\ufeff" + [
        headers.map(h => `"${h}"`).join(';'),
        ...rows.map(r => r.join(';'))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.body.appendChild(document.createElement('a'));
      link.href = url;
      link.download = `${fileName}.csv`;
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Usar window.print() para el PDF. 
      // Activamos isPrinting para que el template renderice TODA la lista (filteredTransactions)
      // en lugar de solo la página actual (paginatedTransactions).
      this.isPrinting = true;
      this.cdr.detectChanges();
      
      this.snackBar.open('Para guardar como PDF, selecciona "Guardar como PDF" en el menú de impresión', 'OK', { duration: 5000 });
      
      setTimeout(() => {
        window.print();
        this.isPrinting = false;
        this.cdr.detectChanges();
      }, 800);
    }

    this.snackBar.open(`Procesando exportación a ${format.toUpperCase()}`, 'OK', { duration: 3000 });
  }
}
