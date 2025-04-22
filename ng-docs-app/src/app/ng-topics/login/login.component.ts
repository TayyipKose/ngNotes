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

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.username && this.password) {
      this.router.navigateByUrl('/layout');
    } else {
      alert('Kullanıcı adı ve parola zorunldur.');
    }
  }
}
