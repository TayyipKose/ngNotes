import { Component } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: [], // css dosyası sildiğimizden boş bir list tanımlıyoruz
})
export class PipeComponent {
  // Kullanıcı listesi
  users: any = [
    { name: 'Mehmet Ates', birthDate: '1995-06-12' },
    { name: 'Zeynep Demir', birthDate: '1998-11-22' },
    { name: 'Tuğba Aslan', birthDate: '1996-03-07' }
  ];


  /* Angular Default Pipelar
  1. **date:** Tarih formatlamak için kullanılır.
     Kullanım: {{ value | date: 'short' }}

  2. **uppercase:** Verilen metni büyük harfe dönüştürür.
     Kullanım: {{ value | uppercase }}

  3. **lowercase:** Verilen metni küçük harfe dönüştürür.
     Kullanım: {{ value | lowercase }}

  4. **currency:** Sayıyı para birimi formatında gösterir.
     Kullanım: {{ value | currency: 'USD': true }}

  5. **percent:** Sayıyı yüzde formatında gösterir.
     Kullanım: {{ value | percent }}

  6. **json:** JSON verisini biçimlendirerek gösterir.
     Kullanım: {{ value | json }}

  7. **slice:** Verilen dizi veya string'i dilimlemeye yarar.
     Kullanım: {{ value | slice: 1:3 }}  // 1. index'ten 3. index'e kadar dilimler
*/
}
