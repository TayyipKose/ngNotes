import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = '';
  email: string = '';
  nameError: boolean = false;
  emailError: boolean = false;

  onSubmit() {
    this.nameError = !this.name;
    this.emailError = !this.email;

    if (!this.nameError && !this.emailError) {
      alert(this.name + ' ' + this.email);
      this.name = "";
      this.email = "";
    }
  }
}
