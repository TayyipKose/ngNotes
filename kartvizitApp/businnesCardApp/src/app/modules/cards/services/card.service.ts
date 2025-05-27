import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
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

  addCard(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/cards', payload).pipe(
      catchError(error => {
        return throwError(() => new Error('Kart eklenirken servis hatası oluştu'));
      })
    );
  }
  updateCard(payload: any, cardID: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cards/${cardID}`, payload).pipe(
      catchError(error => {
        console.error('UpdateCard error:', error);
        return throwError(() => new Error('Kart güncellenirken servis hatası oluştu'));
      })
    );
  }

  deleteCard(cardID: number){
    return this.http.delete<any>(`${this.apiUrl}/cards/${cardID}`).pipe(
      catchError(error => {
        console.error('DeleteCard error:', error);
        return throwError(() => new Error('Kart silinirken servis hatası oluştu'));
      })
    );
  }

}
