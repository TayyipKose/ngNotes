import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem('isLoggedIn'); // Giriş bilgisini temizle
    this.router.navigate(['/']); // Login sayfasına yönlendir
  }
}
