import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Tüm HTTP isteklerini yakalamak için "intercept" fonksiyonunu kullanıyoruz
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Diyelim ki kullanıcı login oldu ve bir token aldı.
    // Normalde bu token'ı localStorage veya sessionStorage gibi bir yerde saklarız.
    const token = 'FakeToken123';

    // Eğer token varsa, bu isteğin HTTP header'ına Authorization bilgisini eklememiz lazım
    // Ama Angular'da HttpRequest nesnesi IMMUTABLE (değiştirilemez)
    // O yüzden doğrudan req üzerinde değişiklik yapamayız.
    // Bunun yerine "clone()" metodunu kullanarak yeni bir kopyasını oluştururuz.

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    /*
      authReq artık eski isteğin bir kopyası,
      ve üzerine Authorization header'ı eklenmiş durumda.

      ÖNEMLİ: Burada Bearer <token> formatı kullanıyoruz.

      Örnek bir header:
      Authorization: Bearer FakeToken123
    */

    // Şimdi düzenlediğimiz authReq'yi alıp işlemeye devam ediyoruz
    return next.handle(authReq);
  }

}
