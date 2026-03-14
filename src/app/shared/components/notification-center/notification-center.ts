import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NotificationService, AppNotification } from '../../../core/services/notification';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatMenuModule, MatButtonModule],
  templateUrl: './notification-center.html',
  styleUrl: './notification-center.scss'
})
export class NotificationCenterComponent {
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  unreadCount = this.notificationService.unreadCount;
  notifications = this.notificationService.notificationsList;

  handleNotificationClick(notification: AppNotification): void {
    this.notificationService.removeNotification(notification.id);
    this.router.navigate(['/transaction-history']);
  }

  markAllAsRead(): void {
    this.notificationService.clearAll();
  }

  navigateToHistory(): void {
    this.router.navigate(['/transaction-history']);
  }
}
