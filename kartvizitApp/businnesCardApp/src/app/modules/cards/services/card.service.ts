import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {ICARD} from "../model/ICARD";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private apiUrl: string
  ) {}


getCards(): Observable<ICARD[]> {
  return this.http.get<ICARD[]>(this.apiUrl + '/cards').pipe(
    tap(res => console.log('Kartlar geldi:', res)),
    map(res => res.filter(res => res.phone)),  // address varsa filtrele

    catchError(err => {
      console.error('Kartları getirirken hata:', err);
      return of([]); // Hata durumunda return of kullanarak Boş dizi olarak hemen Observable oluşturup geri dönelim!
    })
  );
}



}
