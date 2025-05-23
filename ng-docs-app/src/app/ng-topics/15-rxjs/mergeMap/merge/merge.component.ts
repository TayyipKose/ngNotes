import {Component, OnInit} from '@angular/core';
import {delay, merge, of} from "rxjs";

@Component({
  selector: 'app-merge',
  templateUrl: ``,
})
export class MergeComponent implements OnInit{
  /**Merge Operatorü, birden fazla observable nesnesini birleştirerek tek bir Observable çıktısı elde etmemizi sağlar.
   * concat'te aslında birden fazla observable nesnesini birleştirerek tek bir Observable çıktısı elde etmemizi sağlar. farkı
   */
  ngOnInit(): void {
    const letters$ = of('a', 'b', 'c').pipe(delay(1000)); // 1 saniye sonra başlıyor
    const numbers$ = of(1, 2, 3); // gecikme koymadım hemen başlr
    const merged$ = merge(letters$, numbers$); // İki observableı birleştiriyoruz

    merged$.subscribe(result => {
      console.log('Gelen veri:', result);
    });

    /** Console Çıktısı
     Gelen veri: 1
     Gelen veri: 2
     Gelen veri: 3
     // 1 saniye sonra:
     Gelen veri: a
     Gelen veri: b
     Gelen veri: c
     */
  }

  /**
   * MERGE OPERATORÜ NE YAPAR?
   *
   * 🔹 merge(), birden fazla observable'ı eş zamanlı çalıştırır.
   * 🔸 Gelen veriler sırayla değil, hangi stream erken gönderirse ona göre yayılır.
   *
   * Bu örnekte:
   *    - letters$: 'a', 'b', 'c' değerlerini 1 saniye gecikmeli yollar
   *    - numbers$: 1, 2, 3 değerlerini hemen yollar
   *    - merge(), her iki stream’i paralel başlatır
   *
   * 🧠 FARKI NEDİR?
   *    - merge → Tüm kaynakları aynı anda başlatır, verileri karışık sırayla yayar
   *    - concat → İlk observable bitmeden ikinciyi başlatmaz, sıralı çalışır
   *
   * 🎯 Kullanım Yerleri:
   *    - UI'da farklı kaynaklardan gelen verileri tek stream’de toplamak
   *    - Kullanıcıdan gelen çoklu event'leri aynı yere yönlendirmek
   *    - API ve WebSocket gibi eş zamanlı kaynakları dinlemek
   *
   *  Not: Gecikme (delay) verilince merge’in gücü daha net anlaşılır. Çünkü merge() sıraya bakmaz, kim önce veriyi gönderirse onu yayar.
   */


}
