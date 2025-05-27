import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  constructor() {
  }

  cardItem = {
    title: 'Frontend Developer',
    name: 'Tayyip Kose',
    phone: '0555 555 55 55',
    email: 'ornek@mail.com',
    address: 'Istanbul / Turkiye',
  }

  ngOnInit(): void {
  }
}
