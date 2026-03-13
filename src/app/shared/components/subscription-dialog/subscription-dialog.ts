import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Fund } from '../../../core/models/fund.model';
import { BalanceService } from '../../../core/services/balance';
import { CurrencyFormatPipe } from '../../pipes/currency-format-pipe';

@Component({
  selector: 'app-subscription-dialog',
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, 
    CurrencyFormatPipe, MatIconModule
  ],
  templateUrl: './subscription-dialog.html',
  styleUrl: './subscription-dialog.scss',
})
export class SubscriptionDialog {
  private fb = inject(FormBuilder);
  private balanceService = inject(BalanceService);
  
  subscriptionForm: FormGroup;
  fund: Fund;
  availableBalance = this.balanceService.balance().available;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { fund: Fund }
  ) {
    this.fund = data.fund;
    this.subscriptionForm = this.fb.group({
      amount: [this.fund.minAmount, [
        Validators.required, 
        Validators.min(this.fund.minAmount),
        Validators.max(this.availableBalance)
      ]],
      notification: ['email']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubscribe(): void {
    if (this.subscriptionForm.valid) {
      if (this.subscriptionForm.value.amount > this.availableBalance) {
        this.subscriptionForm.get('amount')?.setErrors({ insufficientFunds: true });
        return;
      }
      this.dialogRef.close(this.subscriptionForm.value);
    }
  }

  setMin(): void {
    this.subscriptionForm.patchValue({ amount: this.fund.minAmount });
  }

  setMax(): void {
    this.subscriptionForm.patchValue({ amount: this.availableBalance });
  }
}
