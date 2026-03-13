import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyFormatPipe } from '../../pipes/currency-format-pipe';

@Component({
  selector: 'app-balance-card',
  imports: [CommonModule, MatIconModule, CurrencyFormatPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) amount!: number;
  @Input() icon?: string;
  @Input() trending?: { value: number; isUp: boolean };
}
