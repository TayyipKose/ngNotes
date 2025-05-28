import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardService} from "../../services/card.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {
  @Input() formControl? = new FormControl('');
  @Output() cardSearchComponentSearchText = new EventEmitter<string>();

  onSearch(text: string) {
    this.cardSearchComponentSearchText.emit(text.trim().toLowerCase());
  }

  /**
   * `@Output()` ve `.emit()` mantığını ve bu yapı ile filtreleme işleminin nasıl çalıştığını anlayalım
   *
   * 📌 1. card-search.component: (Child Component)
   * Kullanıcı inputa yazı yazdığında, bu değeri `@Output()` ile dışarıya yani parent component'e (cards.component) gönderiyoruz.
   * Bunun için EventEmitter kullanılır ve `.emit(searchText)` metodu ile gönderme işlemi yapılır.
   *
   * 📌 2. cards.component: (Parent Component)
   * Parent component olan `cards.component`, child component'ten gelen bu searchText’i şöyle yakalar:
   *
   * HTML'de:
   * <app-card-search (cardSearchComponentSearchText)="cardsComponentFiltered($event)"></app-card-search>
   *
   * Bu ifade sayesinde child component içinde `.emit()` ile gönderilen değer,
   * parent componentin `cardsComponentFiltered()` fonksiyonuna `$event` olarak gelir.
   *
   * 📌 3. cardsComponentFiltered() Fonksiyonu:
   * Bu fonksiyon gelen `searchText`'e göre tüm kartları (`allCards`) filtreler.
   * Eğer input boşsa, tüm kartlar gösterilir. Doluysa filtrelenmiş liste (`filteredCards`) oluşturulur.
   *
   * NOT: Aslında kartları `cards.component.ts` içinde `cardsList` veya `allCards` üzerinden `cards-list` componentine yolluyoruz.
   * Bu yüzden filtrelemeyi `card-search` componentinde değil, `cards.component` içinde yapıyoruz.
   * Çünkü `cards-list` sadece gösterme görevinde. Filtreleme ve mantık `cards.component` içinde olmalı.
   *
   * ✅ Kısaca özet:
   * - input → card-search → .emit() → cards.component → filtreleme → güncellenmiş liste → cards-list gösteriyor
   *
   * 🔁 Verinin akış sırası:
   * Kullanıcı inputa yazar → emit ile parent’a verilir → parent filtreler → filtrelenmiş liste gösterilir.
   *
   *
   * Kısaca @Input()'a da değinmek gerekirse
   * Parent (grid) component'ten Child (kl-purchase-form) component'e veri göndermek ve child component'in bu gelen veriyi kullanmasını sağlamak için kullanılır.
   * yani aslında @Input() dışarıdan (parent’tan) veri almak ve o veri geldiğinde içeride bir şeyi göstermek ya da çalıştırmak için kullanılır.
   */

}
