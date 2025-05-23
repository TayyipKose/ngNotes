import {Component, OnInit} from '@angular/core';
import {AsyncSubject, BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Component({
  selector: 'app-subject',
  template: ``,
})
export class SubjectComponent implements OnInit {
  /**
   * Subject => Özelleştirilmiş bir Observable’dır.
   * - Tek bir veri kaynağını, aynı anda birden fazla aboneye yayar.
   * - Tüm aboneler aynı veriyi eş zamanlı alır.
   * - Merkezi kontrol sağlar.
   *
   * Observable: Her abonede ayrı çalışır. (Lazy Loading gibi düşünebiliriz!)
   * Subject: Tüm abonelere aynı anda aynı veriyi gönderir. Subject, geçmişi bilmez; sadece geleceği yayar.
   *
   * Kullan: Eğer tüm abonelerin aynı veriyi **aynı anda** alması gerekiyorsa.
   */

  ngOnInit(): void {
    const _subject = new Subject();
    _subject.subscribe(res => {
      console.log(`ObserverA: ${res}`);
    });
    _subject.next(3);
    _subject.subscribe(res => {console.log(`ObserverB: ${res}`);});
    _subject.next(5);
    _subject.next(7);
    _subject.subscribe(res => { console.log(`ObserverC: ${res}`);});
    _subject.next(9);
    _subject.next('Hello World');
    _subject.subscribe(res => {console.log(`ObserverD: ${res}`);});

    /** Console Çıktısı
     ObserverA: 3        // sadece A aboneydi
     ObserverA: 5        // A ve B abone
     ObserverB: 5
     ObserverA: 7
     ObserverB: 7
     ObserverA: 9        // C abone oluyor
     ObserverB: 9
     ObserverC: 9
     ObserverA: Hello World
     ObserverB: Hello World
     ObserverC: Hello World

     ***ObserverD hiçbir çıktı almaz çünkü ObserverD abone olduğunda, herhangi bir .next() çağrısı yok artık. Yani hiç veri almaz.***
     */
  }


  /*********************************************************************************************************************/

  /** Subject Türleri
   Behavior Subject: Akışa abone olan Observer'ın akıştaki **bir önceki** veriyi alarak başlamasını sağlar. Defaultta bir başlangıç değeri ister
   Replay Subject: Akışa abone olan Observer'ın akışta istenildiği kadar gerideki datayı almamızı sağlar.
   Async Subject: Akıştaki son değerin alınması için kullanılan subject türüdür. Akıştaki son datayı alabilmek için .complete() metodunun tetiklenmesini bekler.
   */
  subjectTypesExample() {
    /**Behavior Subject: Akışa abone olan Observer'ın akıştaki **bir önceki** veriyi alarak başlamasını sağlar. Defaultta bizden bir başlangıç değeri ister.*/
    const behavior = new BehaviorSubject<number>(0); // başlangıç değeri 0
    behavior.next(1);// son değer 1 olur
    behavior.subscribe(val => console.log('BehaviorSubject1:', val)); // burada çıktı: 1 (abonelik anında son değer yayınlanır)
    behavior.next(2);// çıktı: 2 (sonraki yeni değer yayınlanır)
    behavior.complete();//BehaviorSubject1'in nihai değerleri=>1-2

    /**ReplaySubject: Belirtilen sayıda eski değeri tutar, yeni abone onları alır.*/
    const replay = new ReplaySubject<number>(2); // son 2 değeri tut
    replay.next(1);
    replay.next(2);
    replay.next(3);
    replay.subscribe(val => console.log('ReplaySubject:', val)); // Çıktı: 2, 3
    replay.next(4);

    /**Async Subject: Akıştaki son değerin alınması için kullanılır. Akıştaki son datayı alabilmek için .complete() metodunun tetiklenmesini bekler.*/
    const async = new AsyncSubject<number>();
    async.next(1);       // yayınlanmaz
    async.next(2);       // yayınlanmaz
    async.subscribe(val => console.log('AsyncSubject:', val)); // henüz çıkış yok
    async.next(3);       // yayınlanmaz
    async.next(6);       // yayınlanmaz
    async.complete();    // sadece 6 yayınlanır
  }

  /** Subject Types Kullanım Amaçları
   BehaviorSubject: Abone olduğunda en son (veya başlangıç) değeri hemen almak istediğin durumlar için. (Örn: Form durumları, tema seçimi)
   ReplaySubject: Yeni abonenin geçmişteki belli sayıda veya tüm değerleri tekrar alması gerektiğinde. (Örn: Chat uygulamasında önceki mesajları görmek)
   AsyncSubject:Sadece işlem tamamlandığında son değeri yaymak için (örneğin, tamamlanan bir API çağrısının sonucunu yayınlamak)
   */
}
