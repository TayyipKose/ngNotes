import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { takeWhile, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-observer',
  template: `
  <h2>Sipariş Durumu:</h2>
<p *ngIf="orderStatus">{{ orderStatus }}</p>
<button (click)="startTracking()">Takibi Başlat</button>
  `,
  styleUrls: []
})
export class ObserverComponent {

  orderStatus: string = '';

  private statusSteps = [
    'Sipariş Alındı',
    'Hazırlanıyor',
    'Paketleniyor',
    'Kargoya Verildi',
    'Teslim Edildi'
  ];

  // Sipariş takibini başlatma ve duruma göre güncelleme alma
  startTracking() {
    this.getOrderStatusStream().subscribe({
      next: (status) => (this.orderStatus = status),
      complete: () => console.log('Sipariş tamamlandı!'),
    });
  }

  // Her 2 saniyede bir yeni sipariş durumu yayınlayan Observable üretir
  getOrderStatusStream(): Observable<string> {
    return interval(2000).pipe(
      takeWhile((index) => index < this.statusSteps.length),
      map((index) => this.statusSteps[index]),
      tap((status) => console.log(`Durum güncellendi: ${status}`))
    );
  }
}

/**
 * Ne yaptık?
 * - Sipariş adımlarını temsil eden bir array oluşturduk (`statusSteps`).
 * - Her 2 saniyede bir bu adımları sırayla gösteren bir `Observable` tanımladık.
 * - Bu Observable içinde RxJS operatörleri kullandık: `interval`, `takeWhile`, `map`, `tap`.
 * - `startTracking()` fonksiyonu ile butona basıldığında yayın başladı ve her adım ekrana yansıdı.

 * Nasıl yaptık?
 * - `interval(2000)`: Her 2 saniyede bir artan sayı üretir (0, 1, 2, ...).
 * - `takeWhile(index < statusSteps.length)`: Sayılar, dizinin uzunluğuna ulaşana kadar yayına devam eder.
 * - `map(index => statusSteps[index])`: Gelen sayı dizin olarak kullanılır, dizi elemanı alınır (örneğin 0 → "Sipariş Alındı").
 * - `tap(status => ...)`: Her adımda durumu `console.log` ile terminale basar, debugging açısından faydalıdır.
 * - `subscribe({...})`: Observable'ı başlatır. Her yeni adımda `orderStatus` güncellenir, `complete` olunca siparişin tamamlandığı loglanır.

 * Ne öğrendik?
 * - Observable ile zaman kontrollü veri yayını nasıl yapılır.
 * - RxJS operatörleri (map, tap, takeWhile) ile veri akışı nasıl kontrol edilir.
 * - Angular bileşeninde RxJS kullanarak asenkron veri nasıl yönetilir.
 * - HTML'de `*ngIf` ile değişen veriyi nasıl göstereceğimizi gördük.
 * - Gerçek hayattan bir örnekle (sipariş durumu takibi) observable kullanımı daha iyi anlaşıldı.

 ****Önemli Not:
 * Her 2 saniyede bir `interval` ile bir sayı yayınlanıyor → `map` ile bu sayı `statusSteps` dizisinden bir elemana çevriliyor → Böylece sırayla her 2 saniyede bir string ekrana yansıyor.


 ***Ekstra Not:
 - `getOrderStatusStream()` fonksiyonu bir `Observable<string>` döner.
 - Bu, her 2 saniyede bir sırayla sipariş durumlarını yayan bir veri akışıdır.
 - Ancak bu akış `subscribe()` edilmeden çalışmaz. `subscribe()` fonksiyonu çağrılınca:
 - `Observable` başlar,
 - her adımda `next` içindeki kod çalışır (`orderStatus` güncellenir),
 - son adımda `complete` içindeki kod çalışır (örneğin "Sipariş tamamlandı!" mesajı).
 */
