import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'  // Servisi root seviyesinde yapalım
})
export class LocalStorageService {

  create(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value)); // objeyi string'e dönüştürerek kaydediyoruz
  }

  read(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Eğer veri varsa, parse edip geri döneriz, yoksa null döner
  }

  update(key: string, value: any): void {
    this.create(key, value); // Eski veriyi siler, yeni veriyi kaydeder
  }

  delete(key: string): void {
    localStorage.removeItem(key); // Veriyi siler
  }

  // Clear: Tüm localStorage'ı temizler
  clear(): void {
    localStorage.clear();
  }
}
