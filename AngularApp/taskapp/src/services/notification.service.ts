import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showNotification(message: string): void {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification';
    notificationElement.textContent = message;

    document.body.appendChild(notificationElement);

    setTimeout(() => {
      document.body.removeChild(notificationElement);
    }, 3000); // Remove the notification after 3 seconds
  }
}
