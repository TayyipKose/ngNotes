import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      // .pipe() içine bir zincir kuruyoruz: veri işleme + hata yönetimi
      // tap: Gelen veriyi değiştirmeden araya girip bir şey yapmak için kullanılır (örneğin console.log)
      // Örneğin: her post'un title'ına " - Değiştirildi" ekleyelim
      map(posts => posts.map(post => ({
        ...post,
        title: post.title + ' - Değiştirildi'
      }))),

      // map: Gelen veriyi değiştirmek için kullanılır
      // Örneğin: her post'un title'ına " - Değiştirildi" ekleyelim
      map(posts => posts.map(post => ({
        ...post,
        title: post.title + ' - Değiştirildi'
      }))),

      // map operatörü doğrudan array filtrelemesi yapamaz, ancak arrayi dönüştürüp, içinde filter kullanabiliriz
      map(posts => posts.filter(post => post.id < 30)),

      // catchError: Eğer yukarıdaki işlemler sırasında hata olursa, hatayı yakalıyoruz
      catchError(this.handleError)
    );
  }

  // POST: Yeni veri ekleme
  createPost(postData: any): Observable<any> {
    // 1. http.post() ile veri gönderiyoruz
    // 2. return ile Observable'ı döndürüyoruz
    return this.http.post<any>(this.apiUrl, postData).pipe(
      tap(response => console.log('Oluşturuldu:', response)),
      catchError(this.handleError)
    );
  }

  // Hata yönetimi için ortak fonksiyon
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Hata oluştu:', error);
    return throwError(() => new Error('Bir hata oluştu, lütfen tekrar deneyin.'));
  }

  /*Özet Akış:
1-getPosts() metodu çağrıldığında, Observable başlatılır, ancak henüz veri akışı gerçekleşmez.
2-pipe() operatörü, gelen veriyi manipüle etmek için kullanılır.
3-return: Bu manipülasyonlarla birlikte bir Observable döndürülür. nereye döndürüyor sorusuna ise çağırıldığı yere
4-Component içinde, subscribe() ile bu Observable'a abone olunur.
5-Veriler geldiğinde next çalışır, ve UI'da gösterilir.
*/
}
