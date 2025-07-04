import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject, of, throwError} from 'rxjs';
import {catchError, filter, map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  template: ``,
})
export class FilterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  filteredList: any[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.apiGetProducts().pipe(
      filter(products => Array.isArray(products)),
      map(products => products.filter(product => product.price > 100)),
      map(products =>
        products.map(product => ({
          ...product,
          name: product.name.toUpperCase()
        }))
      ),
      tap(products => console.log('Filtrelenmiş ürünler:', products)),
      //tap, Observable’dan geçen veriyi değiştirmeden yan etki yaratmak (örneğin loglama yapmak) için kullanılır.


      map(products => products.slice(0, 5)), // İlk 5 ürünü al
      tap(products => console.log('İlk 5 ürün:', products)), // Logla
      map(products => products.sort((a, b) => a.name.localeCompare(b.name))), // İsimlere göre alfabetik sırala

      catchError((err: HttpErrorResponse) => {
        this.errorMessage = this.handleError(err);
        return of([]); // Hata olsa da boş dizi dönelim ki akış devam etsin
      }),
      takeUntil(this.destroy$) //her subscribe öncesinde olmazsa olmaz koymazsak ngOnDestroy tetiklendiğinde aboneliği otomatik iptal edemez.
    ).subscribe(filtered => {
      this.filteredList = filtered;
    });
  }


  private apiGetProducts() {
    return this.http.get<any[]>(`api/products`).pipe(
      catchError(err => throwError(() => new Error('Ürünler alınamadı')))
    );
  }

  private handleError(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return 'Ürünler bulunamadı';
    } else if (error.status === 500) {
      return 'Sunucu hatası, lütfen daha sonra tekrar deneyin';
    }
    return `Hata: ${error.message || 'Bilinmeyen bir hata oluştu'}`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * FILTER OPERATÖRÜ NE YAPAR?
 *
 * 🔹 filter(), bir observable’dan gelen verileri belirli bir koşula göre süzer.
 * 🔸 Sadece koşulu sağlayan veriler (true döndürenler) yayılır, diğerleri atlanır.
 *
 * destroy$ NE YAPAR?
 * 🔹 destroy$, bir Subject<void> olarak abonelikleri kontrol etmek için sinyal yayar.
 * 🔸 takeUntil(this.destroy$) ile, komponent yok edildiğinde (ngOnDestroy) tüm abonelikler otomatik iptal edilir.
 * 🔸 Bellek sızıntılarını önler; örneğin, HTTP istekleri veya zamanlayıcılar çalışmaya devam etmez.
 *
 * Bu örnekte:
 *    - products-modules$: API’den ürün listesini çeker.
 *    - filter(products-modules => Array.isArray(products-modules)): Gelen verinin dizi olduğundan emin olur.
 *    - products-modules.filter(product => product.price > 100): Fiyatı 100’den büyük ürünleri seçer.
 *    - map ile isimler büyük harfe çevrilir.
 *    - takeUntil(this.destroy$): Komponent yok edildiğinde abonelik iptal edilir.
 *
 * 🧠 FARKI NEDİR?
 *    - filter → Verileri bireysel olarak koşula göre süzer (örneğin, fiyat > 100).
 *    - map → Verileri dönüştürür, ama hiçbirini atlamaz (örneğin, isimleri büyük harfe çevirir).
 * Not: filter()’ın koşulu performans açısından basit olmalı; karmaşık filtrelemeler sunucu tarafına taşınabilir.
 */
