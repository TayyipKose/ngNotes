import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Burada gerçek uygulamada kullanıcı doğrulama işlemleri yapılabilir
    if (this.username && this.password) {
      this.router.navigateByUrl('/binding');
    } else {
      alert('Kullanıcı adı ve parola zorunldur.');
    }
  }
}
