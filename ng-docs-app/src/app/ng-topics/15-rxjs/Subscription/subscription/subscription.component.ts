import {Component} from '@angular/core';

@Component({
  selector: 'app-subscription',
  template: `
    <div>
      <input type="number" style="width: 100px; margin:10px;" [min]="1" [max]="this.users.length"
             placeholder="Kullanıcı ID girin" (input)="changeUserId($event)"/>

      <div *ngIf="errorMessage" style="color: red; margin-top: 10px;">
        {{ errorMessage }}
      </div>

      <div *ngIf="selectedUser && !errorMessage" style="margin-top: 10px;">
        <h3>Kullanıcı Bilgileri</h3>
        <p>Ad: {{ selectedUser.name }}</p>
        <p>Abonelik Durumu: {{ selectedSubscription?.status || 'Bilinmiyor' }}</p>
      </div>
    </div>
  `
})
export class SubscriptionComponent {
  users: any[] = [
    {id: 1, name: 'Ali'},
    {id: 2, name: 'Ayşe'},
    {id: 3, name: 'Mehmet'}
  ];

  subscriptions: any[] = [
    {userId: 1, status: 'Active'},
    {userId: 2, status: 'Inactive'},
    {userId: 3, status: 'Pending'}
  ];

  selectedUserId: number | null = null;
  selectedUser: any | null = null;
  selectedSubscription: any | null = null;
  errorMessage: string | null = null;

  /**Yahu ürün satırlarında pastedLineCell, changeLineCell gibi işte fazlada abartmaya gerek yok kodun mantığını*/

  changeUserId(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    if (isNaN(value) || value <= 0) {
      this.errorMessage = 'Lütfen geçerli bir kullanıcı ID girin';
      this.selectedUser = null;
      this.selectedSubscription = null;
      return;
    }

    this.errorMessage = null;
    this.selectedUserId = value;

    this.selectedUser = this.users.find(u => u.id === value) || null;
    this.selectedSubscription = this.subscriptions.find(s => s.userId === value) || null;

    if (!this.selectedUser) {
      this.errorMessage = 'Kullanıcı bulunamadı';
      this.selectedSubscription = null;
    }
  }
}
