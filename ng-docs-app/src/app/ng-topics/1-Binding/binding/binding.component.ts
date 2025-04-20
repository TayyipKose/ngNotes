import {Component} from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {
  title: string = '_Angular Binding_';  // Property Binding 1
  ornekClass: string = 'blue';           // Property Binding 2
  name: string = '';                     // Two-Way Binding
  message: string = '';                  // Event Binding için

  showMessage() {
    this.message = `Merhaba ${this.name}`;
  }

  /*Notes
Property Binding: Angular bileşenindeki veriyi HTML elementinin özelliğine bağlar.
Two-Way Data Binding: Kullanıcı ile bileşen arasında veri senkronizasyonu sağlar.
Event Binding: Kullanıcı etkileşimiyle bir fonksiyon çalıştırır.
[]: Bileşenden HTML özelliğine veri gönderir (Property Binding).
(): HTML olayından bileşene veri gönderir ve fonksiyon çalıştırır (Event Binding).
[className]: HTML öğesinin `class`ını dinamik olarak bağlar. `[className]="ornekClass"` ile sınıf değiştirilir.
[disabled]: HTML öğesinin disabled özelliğini dinamik olarak bağlar. [disabled]="!name" ile name boşsa buton tıklanamaz.
   */
}
