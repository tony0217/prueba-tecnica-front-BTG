import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Fund } from '../../../core/models/fund.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format-pipe';

@Component({
  selector: 'app-fund-card',
  imports: [CommonModule, MatButtonModule, MatIconModule, CurrencyFormatPipe],
  templateUrl: './fund-card.html',
  styleUrl: './fund-card.scss',
})
export class FundCard {
  @Input({ required: true }) fund!: Fund;
  @Input() showSubscribeButton = true;
  @Input() actionLabel = 'Suscribirse';
  
  @Output() actionClick = new EventEmitter<Fund>();

  onActionClick() {
    this.actionClick.emit(this.fund);
  }
}
