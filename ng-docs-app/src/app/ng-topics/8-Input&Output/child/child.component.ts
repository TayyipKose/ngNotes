import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: []
})
export class ChildComponent {

  @Input() products:any =[]; // Parent'tan ürün listesini alıyoruz

  @Output() productSelected = new EventEmitter<string>(); // Parent'a seçilen ürünü göndereceğiz

  onProductClick(product: string) {
    this.productSelected.emit(product); // Seçilen ürünü parent'a fırlatıyoruz
  }
}
