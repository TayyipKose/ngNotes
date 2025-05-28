import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  next: string = 'X';
  result: string = '';
  buttons: string[] = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]

  setMark(index: number) {
    if (this.buttons[index] !== '' || this.result !== '') {
      return; // doluysa veya oyun bitmişse tıklamayı engelle
    }

    this.buttons[index] = this.next;

    this.checkGameResult();

    if (this.result === '') {
      this.next = this.next === 'X' ? 'O' : 'X';
    }
  }
  resetGame() {
    this.buttons = ['', '', '', '', '', '', '', '', ''];
    this.next = 'X';
    this.result = '';
  }
  checkGameResult() {
    const b = this.buttons;
    // Satırlar
    if (b[0] !== '' && b[0] === b[1] && b[1] === b[2]) {
      this.result = `Oyunu ${b[0]} kazandı!`;
    } else if (b[3] !== '' && b[3] === b[4] && b[4] === b[5]) {
      this.result = `Oyunu ${b[3]} kazandı!`;
    } else if (b[6] !== '' && b[6] === b[7] && b[7] === b[8]) {
      this.result = `Oyunu ${b[6]} kazandı!`;
    }

    // Sütunlar
    else if (b[0] !== '' && b[0] === b[3] && b[3] === b[6]) {
      this.result = `Oyunu ${b[0]} kazandı!`;
    } else if (b[1] !== '' && b[1] === b[4] && b[4] === b[7]) {
      this.result = `Oyunu ${b[1]} kazandı!`;
    } else if (b[2] !== '' && b[2] === b[5] && b[5] === b[8]) {
      this.result = `Oyunu ${b[2]} kazandı!`;
    }

    // Çaprazlar
    else if (b[0] !== '' && b[0] === b[4] && b[4] === b[8]) {
      this.result = `Oyunu ${b[0]} kazandı!`;
    } else if (b[2] !== '' && b[2] === b[4] && b[4] === b[6]) {
      this.result = `Oyunu ${b[2]} kazandı!`;
    }

    // Beraberlik kontrolü (tüm hücreler dolu ve kazanan yok)
    else if (b.every(cell => cell !== '')) {
      this.result = 'Oyun berabere bitti!';
    }
  }

  /**
   * öncelikle bunu bilerek okumalıyım: index Angular'ın *ngFor'da otomatik verdiği dizideki elemanın sırasıdır.
   * yani *ngFor="let item of buttons let index = index" bu mantıkla ngFor'da istediğim zaman ayırt etmek için id' olmasada index'le ayırt edebilirim.
   - Değişkenler:
   buttons: string[] → Oyun alanındaki 9 kutuyu temsil ediyor. Her kutuda ya "X", "O" ya da boş ("") var.
   next: string → Sıradaki oyuncunun işareti. Başlangıçta "X".
   result: string → Oyun sonucu. Boşsa oyun devam ediyor, doluysa oyun bitmiş.

   - HTML Yapısı:
   Sol tarafta 9 adet buton var (3 satır × 3 sütun).
   Her buton buttons dizisindeki değeri gösteriyor ({{buttons[index]}}).
   Butona tıklandığında setMark(index) fonksiyonu çalışıyor.

   - setMark() Fonksiyonu:
   Öncelikle tıklanan kutu boş mu ve oyun devam ediyor mu kontrolü yapılıyor.
   Eğer kutu boşsa, o kutuya sıradaki oyuncunun işaretini koyuyoruz.
   Sonra checkGameResult() ile oyunun kazanılıp kazanılmadığını kontrol ediyoruz.
   Eğer oyun bitmemişse sıradaki oyuncu değişiyor (X → O, O → X).

   - checkGameResult() Fonksiyonu:
   Oyun alanındaki kazanma durumlarını (satır, sütun, çapraz) kontrol ediyoruz.
   Eğer kazanma varsa sonucu result değişkenine yazıyoruz (örneğin "Oyunu X kazandı!").
   Eğer tüm kutular dolmuş ama kazanan yoksa beraberlik bildiriyoruz.

   resetGame() Fonksiyonu:
   Oyun bittiğinde veya “Yeni Oyun” butonuna basıldığında çağrılır.
   Oyun alanını boşaltır, sıradaki oyuncuyu X yapar ve sonucu sıfırlar.
   Böylece yeni bir oyun başlar.

   - Nasıl Çalışıyor?
   Sayfa yüklendiğinde buttons dizisi boş, sıradaki oyuncu X.
   Kullanıcı 9 kutudan birine tıklayınca:
   O kutu X ile işaretlenir.
   Kazanma durumu kontrol edilir.
   Eğer oyun bitmemişse sıradaki oyuncu O olur.
   Oyuncular sırayla işaret koyar.
   Bir oyuncu 3 aynı işareti yatay, dikey veya çapraz yaparsa oyun biter ve sonuç ekranda gösterilir.
   Oyun bittiğinde başka tıklamalar engellenir.
   “Yeni Oyun” butonuna basılınca oyun sıfırlanır.

   - Özetle
   buttons: Oyun alanının durumu.
   next: Kim hamle yapacak.
   result: Oyun sonucu.
   setMark(): Hamle yapmayı sağlar.
   checkGameResult(): Kazanma ya da beraberlik durumunu kontrol eder.
   resetGame(): Oyunu baştan başlatır.
   */
}
