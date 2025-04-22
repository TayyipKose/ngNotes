import { Component } from '@angular/core';

@Component({
  selector: 'app-loops',
  templateUrl: './loops.component.html',
  styleUrls: ['./loops.component.css']
})
export class LoopsComponent {
  userList = [
    { id: 1, name: "Ahmet Yılmaz", age: 28, city: "İstanbul" },
    { id: 2, name: "Zeynep Demir", age: 24, city: "Ankara" },
    { id: 3, name: "Mehmet Kaya", age: 31, city: "İzmir" },
    { id: 4, name: "Elif Çetin", age: 26, city: "Bursa" }
  ];

  selectedUser: any = null;

  newUser = {
    name: '',
    age: null,
    city: ''
  };

  isEditing = false;

  // Kullanıcıyı seçip detay panelinde gösterir
  selectUser(user: any): void {
    this.selectedUser = { ...user }; // kopyasını al
    this.isEditing = false;
  }

  // Detay panelini kapatır
  closeDetails(): void {
    this.selectedUser = null;
  }

  // Formdan yeni kullanıcı ekler
  addUser(): void {
    if (!this.newUser.name || !this.newUser.age || !this.newUser.city) {
      alert("Tüm alanlar doldurulmalı!");
      return;
    }

    const newId = this.userList.length > 0 ? Math.max(...this.userList.map(u => u.id)) + 1 : 1;

    this.userList.push({
      id: newId,
      name: this.newUser.name,
      age: this.newUser.age,
      city: this.newUser.city
    });

    this.newUser = { name: '', age: null, city: '' };
  }

  // Belirli bir kullanıcıyı listeden siler
  deleteUser(userId: number): void {
    this.userList = this.userList.filter(user => user.id !== userId);
    if (this.selectedUser?.id === userId) this.selectedUser = null;
  }

  // Seçili kullanıcıyı düzenleme moduna geçirir
  startEdit(): void {
    this.isEditing = true;
  }

  // Seçili kullanıcıdaki değişiklikleri kaydeder
  saveEdit(): void {
    const index = this.userList.findIndex(u => u.id === this.selectedUser.id);
    if (index > -1) {
      this.userList[index] = { ...this.selectedUser };
      this.isEditing = false;
    }
  }

  // Tüm kullanıcıların isimlerini console'a yazdırır
  logNames(): void {
    this.userList.forEach(user => {
      console.log('Kullanıcı adı:', user.name);
    });
  }
}
