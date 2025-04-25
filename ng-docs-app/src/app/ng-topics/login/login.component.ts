import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {
  }

  onSubmit(): void {
    if (this.username === 'admin' && this.password === '123') {
      // Kullanıcı bilgisi localStorage'a yazılır
      // AuthGuard bu bilgiyi kontrol ederek, kullanıcının giriş yapıp yapmadığını belirler.
      localStorage.setItem('isLoggedIn', 'true'); // Guard burayı kontrol edeceğinden ve if içinde olduğumuzdan true set edeceğiz
      // Kullanıcı doğru giriş yaptıysa, layout sayfasına yönlendirilir
      // Burada Angular, 'AuthGuard'ı kullanarak sayfanın erişilebilir olup olmadığını kontrol eder
      this.router.navigateByUrl('/layout');
    } else {
      alert('Kullanıcı adı ve parola hatalı!');
    }
  }

}
