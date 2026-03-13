import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  notify(method: 'email' | 'sms' | undefined, fundName: string, amount: number, type: 'subscription' | 'cancellation'): void {
    if (!method) return;
    
    const actionStr = type === 'subscription' ? 'Suscripción' : 'Cancelación';
    const message = `[Simulando ${method.toUpperCase()}]: ${actionStr} de ${fundName} por COP $${amount}`;
    
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
