import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Guard global olarak uygulamanın her yerinde kullanılabilir
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {

  constructor(private router: Router) {}

  // ✅ Sayfaya girmeden önce kontrol (örneğin /layout sayfası)
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // true olarak login'de ayarlanıyor
    if (!isLoggedIn) {
      // Giriş yapılmamışsa login sayfasına yönlendir
      return this.router.parseUrl('/login');
    }
    return true; // Giriş yapılmışsa sayfaya erişime izin ver
  }

  // ✅ Alt route'lara girmeden önce kontrol (örneğin /layout/todo)
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Aynı şekilde canActivate'e yönlendirilerek tekrar kontrol yapılır
    return this.canActivate(childRoute, state);
  }

  //  !!Sayfadan çıkmadan önce kullanıcıyı uyar
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    // Uyarı verir, "Tamam" derse true döner ve geçiş olur, "İptal" derse geçiş engellenir
    return confirm('Sayfadan ayrılmak istediğinize emin misiniz?');
  }
}
