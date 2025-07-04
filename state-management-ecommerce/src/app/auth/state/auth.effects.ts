import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(response => {
            // response'da başarılı durum varsa success action dispatch et
            return AuthActions.loginSuccess({ user: response.user, token: response.token });
          }),
          catchError(err => {
            const errorMsg = err.error?.message || 'Giriş başarısız oldu!';
            return of(AuthActions.loginFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}


/**
 * Açıklama:
 * - Effect'ler, asenkron işlemler (örneğin HTTP istekleri) için kullanılır.
 * - 'login$' effect'i, [Auth] Login action tetiklendiğinde devreye girer.
 * - AuthService.login ile backend'e istek atılır.
 * - Başarılı olursa loginSuccess action'ı tetiklenir ve reducer güncellenir.
 * - Hata olursa loginFailure tetiklenir ve hata mesajı store'a yazılır.
 *
 * createEffect: Effect oluşturur.
 * ofType: Sadece belirli türdeki action'ları dinlememizi sağlar.
 * mergeMap: Asenkron işlemler için kullanılır.
 * catchError: Hata durumlarını yakalar ve hata action'ı fırlatır.
 *
 * Eğer AuthService henüz yoksa, bu yapıyı şimdilik sabit değerlerle de test edebiliriz.
 */
