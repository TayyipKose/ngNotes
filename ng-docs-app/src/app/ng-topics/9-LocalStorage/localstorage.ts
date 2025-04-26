import {Component} from '@angular/core';
import {LocalStorageService} from './localStorage.service';

@Component({
  selector: 'app-localstorage',
  template: `
    <div style="margin: 15px;">
      <input [(ngModel)]="newUser" placeholder="Enter name"/>
      <button (click)="onSaveOrUpdate()">
        {{ editingKey === null ? 'Ekle' : 'Güncelle' }}
      </button>

      <ul>
        <li style="margin:5px;" *ngFor="let key of userList">
          {{ readUser(key) }}
          <button (click)="startEditing(key)">Güncelle</button>
          <button (click)="deleteUser(key)">Sil</button>
        </li>
      </ul>
    </div>
  `,
  styleUrls: []
})
export class LocalstorageComponent {

  newUser: string = '';
  userList: string[] = [];
  editingKey: string | null = null; // düzenlenen kullanıcının key'i

  constructor(private localStorageService: LocalStorageService) {
    this.loadUserKeys();
  }

  // Kullanıcı anahtarlarını yükle
  loadUserKeys() {
    const keys = this.localStorageService.read('users');
    if (keys) {
      this.userList = keys;
    }
  }

  // Kullanıcı ismini oku
  readUser(key: string): string {
    const user = this.localStorageService.read(key);
    return user ? user : '';
  }

  // Yeni kullanıcı ekle veya güncelle
  onSaveOrUpdate() {
    if (this.newUser.trim()) {
      if (this.editingKey === null) {
        // Yeni ekleme
        const key = `user_${Date.now()}`; // eşsiz bir id oluştur
        this.localStorageService.create(key, this.newUser.trim());
        this.userList.push(key);
        this.localStorageService.update('users', this.userList);
      } else {
        // Güncelleme
        this.localStorageService.update(this.editingKey, this.newUser.trim());
      }

      this.newUser = '';
      this.editingKey = null;
    } else {
      alert('İsim giriniz.');
    }
  }

  // Güncellemek için inputa veriyi getir
  startEditing(key: string) {
    this.editingKey = key;
    this.newUser = this.readUser(key);
  }

  // Kullanıcıyı sil
  deleteUser(key: string) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.localStorageService.delete(key);
      this.userList = this.userList.filter(k => k !== key);
      this.localStorageService.update('users', this.userList);

      if (this.editingKey === key) {
        this.newUser = '';
        this.editingKey = null;
      }
    }
  }
}
