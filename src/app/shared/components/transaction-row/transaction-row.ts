import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Transaction } from '../../../core/models/transaction.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format-pipe';

@Component({
  selector: 'app-transaction-row',
  imports: [CommonModule, MatIconModule, CurrencyFormatPipe],
  templateUrl: './transaction-row.html',
  styleUrl: './transaction-row.scss',
})
export class TransactionRow {
  @Input({ required: true }) transaction!: Transaction;
}
