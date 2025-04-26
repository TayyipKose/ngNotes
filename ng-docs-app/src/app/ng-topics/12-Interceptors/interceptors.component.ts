import {Component} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-interceptors',
  templateUrl: './interceptors.component.html',
  styleUrls: []
})
export class InterceptorsComponent implements HttpInterceptor {
  interceptor = "Angular'da HTTP istekleri (get, post vs.) giderken veya cevap gelirken araya girip bir şeyler eklemek, değiştirmek veya kontrol etmek isteriz.";
  notes='Interceptorlar modulün providers kısmına eklenmek zorundadır!';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
}
