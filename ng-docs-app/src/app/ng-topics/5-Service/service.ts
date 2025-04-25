import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

// ProductService: API'den veri çeken servis
@Injectable({ providedIn: 'root' }) // Uygulama genelinde kullanılabilir
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products'; // API'nin ana adresi

  constructor(private http: HttpClient) {} // HttpClient: API istekleri için

  // Ürünleri getirir (arama, sıralama ve sayfalama için)
  getProducts(options: { search?: string; sortBy?: string; order?: string; page?: number } = {}): Observable<any> {
    // Arama varsa /search, yoksa ana endpoint
    const url = options.search ? `${this.baseUrl}/search` : this.baseUrl;
    const limit = 10; // Her sayfada 10 ürün
    const page = options.page ?? 1; // Varsayılan 1. sayfa
    const skip = (page - 1) * limit; // Kaç ürün atlanacak? (ör. 2. sayfa: skip=10)

    // HttpParams: API parametrelerini tutar (limit, skip, sortBy vb.)
    let params = new HttpParams()
      .set('limit', limit.toString()) // .set(): Parametre ekler, limit=10
      .set('skip', skip.toString()) // skip ..

    // Arama varsa q parametresi ekle, yoksa kaldır
    if (options.search) {
      params = params.set('q', options.search.trim());
    } else {
      params = params.delete('q');
    }

    // API'ye GET isteği gönder
    return this.http.get(url, { params });
  }

  // Tek bir ürünün detayını getirir
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`); // Ör: https://dummyjson.com/products/1
  }
}

// ProductListComponent: Ürünleri listeler, sayfalama ve arama yapar
@Component({
  selector: 'app-product-list',
  template: `
      <h2>Ürün Listesi</h2>
      <!-- Arama kutusu: Yazılan her şey search değişkenine bağlanır -->
      <input [(ngModel)]="search" (input)="load()" placeholder="Ürün ara..." />
      <!-- Sıralama kriteri seçimi -->
      <select [(ngModel)]="sortBy" (change)="load()">
        <option value="title">Başlık</option>
        <option value="price">Fiyat</option>
      </select>
      <!-- Sıralama yönü seçimi -->
      <select [(ngModel)]="order" (change)="load()">
        <option value="asc">Artan</option>
        <option value="desc">Azalan</option>
      </select>

      <!-- Ürün listesi: Her ürün tıklanabilir, detay sayfasına gider -->
      <ul>
        <li *ngFor="let product of products">
          <a [routerLink]="['/layout/service/product', product.id]">{{ product.title }} — {{ product.price }}₺</a>
        </li>
      </ul>

      <!-- Sayfalama: Toplam sayfa 1'den büyükse göster -->
      <div *ngIf="totalPages > 1">
        <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1">Önceki</button>
        <span>Sayfa {{ currentPage }} / {{ totalPages }}</span>
        <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages">Sonraki</button>
      </div>
    `
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Ürün listesi
  search = ''; // Arama terimi
  sortBy = 'title'; // Sıralama kriteri
  order = 'asc'; // Sıralama yönü
  currentPage = 1; // Mevcut sayfa
  totalPages = 1; // Toplam sayfa sayısı

  constructor(private productService: ProductService) {}

  // Bileşen yüklendiğinde ilk ürünleri getir
  ngOnInit() {
    this.load();
  }

  // load(): Ürünleri API'den çeker, ekrana gösterir
  load() {
    this.productService
      .getProducts({
        search: this.search, // Arama terimi
        sortBy: this.sortBy, // Sıralama kriteri
        order: this.order, // Sıralama yönü
        page: this.currentPage // Hangi sayfa
      })
      .subscribe((response: any) => {
        this.products = response.products; // Ürünleri kaydet
        this.totalPages = Math.ceil(response.total / 10); // Toplam sayfa: total / limit
      });
  }

  // goToPage(): Sayfayı değiştirir
  goToPage(page: number) {
    // Sadece geçerli sayfalara git (1 ile totalPages arası)
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page; // Yeni sayfayı ayarla
      this.load(); // Yeni sayfanın ürünlerini yükle
    }
  }
}

// ProductDetailComponent: Tek ürünün detayını gösterir
@Component({
  selector: 'app-product-detail',
  template: `
      <div *ngIf="product; else loading">
        <h2>{{ product.title }}</h2>
        <p>Fiyat: {{ product.price }}₺</p>
        <p>{{ product.description }}</p>
        <a routerLink="/layout/service">Geri</a>
      </div>
      <ng-template #loading>Yükleniyor...</ng-template>
    `
})
export class ProductDetailComponent implements OnInit {
  product: any; // Ürün bilgileri

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  // Bileşen yüklendiğinde ürün detayını çek
  ngOnInit() {
    // URL'deki id parametresini al (ör. /layout/service/product/1 -> id=1)
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe((response) => {
      this.product = response; // Ürün detayını kaydet
    });
  }
}
