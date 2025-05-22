import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  template: `<p>Console'u kontrol et :)</p>`,
  styleUrls: []
})
export class ObservableComponent implements OnInit, OnDestroy {
  private timerSubscription!: Subscription;

  ngOnInit(): void {
    /**
     * 1️⃣ MANUEL OBSERVABLE OLUŞTURMA
     * Bu Observable, sadece 3 veri gönderip tamamlanır.
     */
    const basicObservable = new Observable<string>(observer => {
      observer.next('📦 Başlatıldı');
      observer.next('📦 Kullanıcı geldi');
      observer.next('📦 Bildirim gösterildi');
      observer.complete();
    });

    basicObservable.subscribe({
      next: (val) => console.log('✅ Basic Observable:', val),
      complete: () => console.log('🔚 Basic tamamlandı')
    });

    /**
     * 2️⃣ INTERVAL – OPERATÖRLÜ AKIŞ
     * Sonsuz veri üretir. 1 sn aralıkla.
     * Burada map + tap + take + finalize gibi operatörleri zincirliyoruz.
     */
    const timer$ = interval(1000).pipe(
      take(5), // 0–4 üretip tamamlanır
      tap(val => console.log('📍 Raw:', val)),
      map(val => val * 2), // veriyi dönüştür
      finalize(() => console.log('🧹 Temizlendi (finalize)!'))
    );

    this.timerSubscription = timer$.subscribe({
      next: (val) => console.log('⏱️ Timer verisi (işlenmiş):', val),
      complete: () => console.log('⏳ Akış tamamlandı (5 saniye sonra)')
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      console.log('🧼 Unsubscribed – Component yok edildi');
    }
  }
}


/**
 * OBSERVABLE NEDİR? NEDEN VARDIR?
 * -------------------------------------
 * - Observable, zaman içerisinde yayılan verileri temsil eden bir **push-based** asenkron veri yapısıdır.
 * - Angular reactive mimarisinde, HTTP, Reactive Forms, Router events, WebSocket gibi birçok yapı Observable kullanır.
 * - Promiselardan farkı: Tek değil, **çoklu veri** yayabilir. Ayrıca **iptal edilebilir** (unsubscribe).
 * - Observer Pattern + Iterator Pattern birleşimidir.
 *
 * -------------------------------------
 * 🔄 OBSERVABLE – OBSERVER RELASYONU
 * -------------------------------------
 * - Observable = Producer (yayıncı) → Veriyi emit eden entity
 * - Observer = Consumer (abonelik) → Veriyi dinleyen entity
 * - Observable, cold by default’tur → `.subscribe()` çağrılana kadar hiçbir şey yaymaz.
 *
 * - `.subscribe()` ile 3 callback sağlanır: (yani her subcribede default gelenler aslında callback oluyor hiç böyle düşünmemiştim)
 *   1. `next(value)`     → Her yeni veri ile çağrılır.
 *   2. `error(err)`      → Akışta hata olursa çağrılır. Akış burada kesilir.
 *   3. `complete()`      → Akış başarıyla sonlandığında çağrılır.
 *
 * - Örnek Observer nesnesi:
 *   {
 *     next: val => console.log(val),
 *     error: err => console.error(err),
 *     complete: () => console.log("Akış tamamlandı.")
 *   }
 *
 * -------------------------------------
 * 🧠 ARKA PLANDA NELER OLUYOR?
 * -------------------------------------
 * const obs$ = new Observable(observer => {
 *   observer.next('data');
 *   observer.complete();
 * });
 *
 * - `new Observable(...)`: Constructor, aslında bir **setup function** tanımı alır.
 * - Bu setup function, `subscribe()` edildiğinde çalıştırılır. (Lazy evaluation)
 * - `observer` argümanı yukarıdaki nesnedir.
 * - `next`, `error`, `complete` metotları, `Subscription` objesi üzerinden lifecycle’ı kontrol eder.
 *
 * - Observable kendi cleanup mekanizmasına sahiptir:
 *   const obs$ = new Observable(subscriber => {
 *     const id = setInterval(() => subscriber.next('tick'), 1000);
 *     return () => clearInterval(id); // Teardown logic!
 *   });
 *
 * -------------------------------------
 * ✅ OBSERVABLE NEDEN GÜÇLÜ?
 * -------------------------------------
 * - Promiselerin ötesinde: Akışlar, cancel edilebilir, yeniden denenebilir, debounce edilebilir.
 * - Zamanla yayılan verileri (stream) pipe edebilir, birden çok operatörle zincirleyebilirsin.
 * - Error ve Completion mantığı, imperative kontrol akışına göre daha şeffaf ve kapsayıcıdır.
 * - Angular’da HttpClient observable döndürür çünkü:
 *   - Subscribe edildiği anda request atılır (cold)
 *   - Cancel mekanizması mümkündür (unsubscribe, takeUntil, switchMap)
 *   - Akışlara operatör ekleyerek işlenebilir hale gelir (retryWhen, catchError, finalize)
 *
 * -------------------------------------
 * 🧰 HAZIR OBSERVABLE YAPICILARI
 * -------------------------------------
 * import { of, from, interval, timer } from 'rxjs';
 *
 * - `of(1, 2, 3)`         → Tek tek değerleri sıralı emit eder.
 * - `from([1, 2, 3])`     → Iterable veya Promise’i Observable yapar.
 * - `interval(1000)`     → Belirtilen aralıkla sonsuz sayı yayar.
 * - `timer(3000)`        → Belirli süre sonra bir kez emit eder.
 *
 * - Cold observable’dırlar: `.subscribe()` olmadan çalışmazlar.
 *
 * -------------------------------------
 * 🔄 PIPES & OPERATORS – TRANSFORMASYON
 * -------------------------------------
 * import { map, filter } from 'rxjs/operators';
 *
 * timer(0, 1000)
 *   .pipe(
 *     filter(val => val % 2 === 0),  // çift olanları geçir
 *     map(val => val * 10)           // 10 ile çarp
 *   )
 *   .subscribe(val => console.log('Çıktı:', val));
 *
 * - `pipe()`, observable üzerinden geçecek akışı dönüştürür.
 * - Operatörler composable’dır: Birbirine zincirlenebilirler.
 * - map/filter => array metodlarına benzer ama stream üzerinde çalışır.
 * - Operatörler: transformation (map), filtering (filter), combination (mergeMap), timing (debounceTime), error (catchError)
 *
 * -------------------------------------
 * 💥 İLERİ SEVİYE İNCELİKLER
 * -------------------------------------
 * - Angular'da component bazlı memory leak’leri önlemek için:
 *   1. `takeUntil(destroy$)` kullan (Component yaşam döngüsüne uygun)
 *   2. Subscription'ları `ngOnDestroy()` içinde `unsubscribe()` ile temizle
 *   3. `AsyncPipe` kullanmak daha güvenli → Template içindeki observable’lar otomatik unsubscribe edilir.
 *
 * - `switchMap` vs `mergeMap` farkı:
 *   - `switchMap`: Önceki isteği iptal eder → Autocomplete, search gibi durumlar
 *   - `mergeMap`: Tüm alt akışları paralel yürütür → HTTP serisi gibi durumlar
 *   - `concatMap`: Sırayla işler → Queue senaryoları
 *
 * - `shareReplay`, `publishReplay`, `refCount` → Multicasting senaryolarında faydalıdır (aynı veriyi birden fazla subscriber’a tek request ile ulaştırmak için)
 *
 * -------------------------------------
 * ⚠️ HATALARDAN KAÇIN
 * -------------------------------------
 * - Unutulan `unsubscribe()` → Bellek sızıntısı
 * - Her `.subscribe()` yeni bir execution başlatır → Aynı observable’a çok kez subscribe etme ihtiyacı varsa `shareReplay()` gibi operatör kullan.
 * - `subscribe()` içinde side-effect varsa → bu kodları `tap()` içine taşı, test edilebilirliği artır.
 *
 * -------------------------------------
 * 📌 SENIOR SEVİYE PRATİKLER
 * -------------------------------------
 * - Observable zincirini mümkün olduğunca servis katmanına taşı → Component’ler sade kalır.
 * - RxJS marbles (diagram) kullanarak zamanla değişen akışları test et.
 * - `.pipe(take(1))` → sadece 1 veri alıp otomatik unsub olmak için kullanışlıdır.
 * - Operatör sıralaması önemlidir: `filter` → `map` → `switchMap` gibi optimize sırayla yaz.
 * - Kendi observable’ını yazarken teardown logic mutlaka ekle!
 *
 */
