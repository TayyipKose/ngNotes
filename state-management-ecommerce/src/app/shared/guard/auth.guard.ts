import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import * as AuthSelectors from 'app/auth/state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate() {
    return this.store.select(AuthSelectors.selectUser).pipe(
      take(1),
      map(user => {
        if (user) {
          return true; // kullanıcı giriş yapmışsa geçebilir
        } else {
          this.router.navigate(['/auth/login']); // giriş yoksa login'e yönlendir
          return false;
        }
      })
    );
  }
}
