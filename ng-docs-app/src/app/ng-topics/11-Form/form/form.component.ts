import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})
export class FormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
  });

  constructor() {
  }

  ngOnInit(): void {
    // FormGroup ve FormControl ile formu tanımlıyoruz
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formClear();
      alert('Form Gönderim islemi basarili');
    } else {
      this.markAllFieldsAsTouched(); // Hatalı alanları işaretlerizz
    }
  }

  // Formu göndermeden önce tüm alanları "touched yani " yaparız
  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach(control => control.markAsTouched());
  }

  // Hata mesajını döndüren fonksiyon
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) return `${controlName} zorunlu`;
    if (control?.hasError('minlength')) return `${controlName} en az 3 karakter olmalı`;
    if (control?.hasError('email')) return 'Geçerli bir e-posta girin';
    if (control?.hasError('min')) return `${controlName} en az 18 olmalı`;
    return '';
  }

  // Hata durumunda input elemanına kırmızı border ekler
  isFieldInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched ? true : false;
  }

  formClear() {
    this.form.reset();
  }
}
