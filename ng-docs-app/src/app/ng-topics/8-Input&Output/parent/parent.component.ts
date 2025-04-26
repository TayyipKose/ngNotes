import {Component} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: []
})
export class ParentComponent {

  products: any = [
    {name: 'Laptop', price: 1500},
    {name: 'Telefon', price: 800},
    {name: 'Tablet', price: 500},
    {name: 'Kulaklık', price: 150}
  ];

  selectedProduct: any;

  onProductSelected(product: string) {
    this.selectedProduct = product; // Gelen ürünü burada tutuyoruz
  }

  /*
  Input → parent'ın verdiği veri → child'da otomatik akar.
  Output → child'ın fırlattığı olay → parent bir şey yapar (örneğin bir method çalıştırır).
  Output her zaman EventEmitter ile emit() edilir.
*/

  /*
Output Konusunda Kritikler!
* Output bir olaydır, bir değer değildir.
* Yani veri taşımaz gibi görünür, ama veri göndererek bir olay bildirir.
* Örneğin, "Laptop seçildi" olayını gönderir, ama bu olayın içinde "Laptop" verisi de vardır.
* Emit() çağırmadıkça output çalışmaz.
* Input sürekli bağlıdır (değişince otomatik güncellenir), Output tetikleyince çalışır
*/
}
