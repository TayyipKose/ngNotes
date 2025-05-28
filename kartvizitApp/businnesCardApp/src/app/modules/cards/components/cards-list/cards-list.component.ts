import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardService} from "../../services/card.service";
import {CardModalComponent} from "../card-modal/card-modal.component";
import {CardsComponent} from "../../cards.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {
  @Input() _cards: any;
  @Output() cardListComponentEmitGetCards = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private cardService: CardService,
    private cardsComponent: CardsComponent,
    private snackBar: MatSnackBar,
  ) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  opencardDetail(selectedCard: any) {
    const dialog = this.dialog.open(CardModalComponent, {
      width: '400px',
      data: selectedCard,
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.cardListComponentEmitGetCards.emit();
      }
    })
  }

  deleteCard(selectedCard: any) {
    const confirmed = confirm('Kartı silmek istediğinizden emin misiniz?');
    if (!confirmed) {
      return;
    }

    this.cardService.deleteCard(selectedCard.id).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error('Kart silme sırasında hata oluştu:', error);
        this.openSnackBar('Kart silinirken hata oluştu.', '');
      },
      complete: () => {
        this.openSnackBar('Kart başarıyla silindi.', '');
        this.cardsComponent.getCards();
      }
    });
  }


//pagination fonksiyonları
  pageSize = 2; //
  currentPage = 1;
  get totalPages(): number {
    return Math.ceil(this._cards.length / this.pageSize);
  }

  get pagedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this._cards.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  /*
    Sayfalama Mantığı (Pagination) Nedir?
    -------------------------------------
    Diyelim elimizde 10 tane kart (veri) var ama hepsini aynı anda göstermek istemiyoruz.
    Mesela sayfa başına sadece 2 tane kart gösterelim.

    Bu durumda, elimizdeki verileri sayfalara bölüp, kullanıcının hangi sayfayı seçtiğine göre
    sadece o sayfaya ait verileri gösteriyoruz.

    Örnek:
      - 10 kart var
      - Sayfa başına 2 kart gösterilecek
      - Toplam sayfa sayısı: 10 / 2 = 5 sayfa
      - Kullanıcı 1. sayfadaysa kart 1 ve 2 gösterilecek
      - Kullanıcı 2. sayfadaysa kart 3 ve 4 gösterilecek
      - ... ve böyle devam edecek.

    Şimdi kodu adım adım açıklayalım:

    1) pageSize = 2;
       - Her sayfada kaç kart gösterileceğini belirler.
       - Bu örnekte sayfa başına 2 kart gösterilecek.

    2) currentPage = 1;
       - Kullanıcının şu anda hangi sayfada olduğunu tutar.
       - Başlangıçta 1. sayfadayız.

    3) totalPages getter'ı:
       - Toplam sayfa sayısını hesaplar.
       - Math.ceil(this._cards.length / this.pageSize)
         => Kart sayısını sayfa başına kart sayısına böl, yukarı yuvarla.
       - Örneğin 10 kart / 2 kart = 5 sayfa.

    4) pagedCards getter'ı:
       - Şu anda gösterilmesi gereken kartların listesini döner.
       - startIndex:  (currentPage - 1) * pageSize
         => 1. sayfa için: (1 - 1) * 2 = 0 (ilk kartın indeksi)
         => 2. sayfa için: (2 - 1) * 2 = 2 (3. kartın indeksi)
       - slice(startIndex, startIndex + pageSize) ile sadece o aralıktaki kartlar alınır.
         Mesela 1. sayfa için slice(0, 2) => 0 ve 1 indeksindeki kartlar.
         2. sayfa için slice(2, 4) => 2 ve 3 indeksindeki kartlar.
       - Böylece sayfa başına sadece ilgili kartlar gösterilir.

    5) goToPage(page: number)
       - Sayfa numarasını değiştirir.
       - Gelen sayfa numarası geçerli (1 ile totalPages arasında) değilse işlem yapmaz.
       - currentPage değiştiğinde Angular otomatik olarak pagedCards günceller ve sayfadaki kartlar değişir.

    6) nextPage() ve prevPage()
       - Sırayla bir sonraki veya bir önceki sayfaya gider.
       - Bunlar da goToPage fonksiyonunu çağırır.

    Sonuç:
    Sayfa numarasına göre ilgili kartlar _cards listesinden kesilir (slice) ve gösterilir.
    Böylece sayfa başına kaç kart gösterileceği kontrol edilir.

    Yani:
    - Tüm kartlar tek bir listede durur.
    - Her sayfa için sadece belli aralıktaki kartlar gösterilir.
    - Kullanıcı sayfa numarası değiştirdikçe gösterilen kartlar değişir.

    Bu yöntem frontend’de API olmadan kendi verilerin üzerinde basit sayfalama yapmanı sağlar.

  */

}
