import { Injectable, inject, signal, computed } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'subscription' | 'cancellation';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  
  private notifications = signal<AppNotification[]>(this.loadNotifications());
  
  public unreadCount = computed(() => this.notifications().length);
  public notificationsList = computed(() => this.notifications());

  private loadNotifications(): AppNotification[] {
    const saved = localStorage.getItem('btg_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  private saveNotifications(notifs: AppNotification[]): void {
    localStorage.setItem('btg_notifications', JSON.stringify(notifs));
  }

  notify(method: 'email' | 'sms' | undefined, fundName: string, amount: number, type: 'subscription' | 'cancellation'): void {
    const actionStr = type === 'subscription' ? 'Apertura' : 'Cancelación';
    const title = `${actionStr} completada`;
    const message = `Se ha procesado exitosamente la ${actionStr.toLowerCase()} en ${fundName}.`;
    
    // Create persistent notification
    const newNotification: AppNotification = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      message,
      timestamp: new Date(),
      type
    };
    
    this.notifications.update(prev => {
      const updated = [newNotification, ...prev];
      this.saveNotifications(updated);
      return updated;
    });

    if (!method) return;
    
    const snackBarMessage = `[Simulando ${method.toUpperCase()}]: ${actionStr} de ${fundName} por COP $${amount}`;
    
    const panelClass = type === 'subscription' ? 'snack-subscription' : 'snack-cancellation';
    
    this.snackBar.open(snackBarMessage, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['premium-snackbar', panelClass]
    });
  }

  removeNotification(id: string): void {
    this.notifications.update(prev => {
      const updated = prev.filter(n => n.id !== id);
      this.saveNotifications(updated);
      return updated;
    });
  }

  clearAll(): void {
    this.notifications.set([]);
    localStorage.removeItem('btg_notifications');
  }
}
