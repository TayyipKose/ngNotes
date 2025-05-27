import {Component, Input} from '@angular/core';
import {ICARD} from "../../model/ICARD";

@Component({
  selector: 'app-cards-item',
  templateUrl: './cards-item.component.html',
  styleUrls: ['./cards-item.component.scss']
})
export class CardsItemComponent {
  @Input() _card!: ICARD;

  constructor() {
  }
}
