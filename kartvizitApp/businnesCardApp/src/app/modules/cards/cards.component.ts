import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardModalComponent} from "./components/card-modal/card-modal.component";
import {CardService} from "./services/card.service";
import {ICARD} from "./model/ICARD";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cardsList:ICARD[] = [];
  constructor(
    private dialog: MatDialog,
    private cardService: CardService,
  ) {
  }


  ngOnInit(): void {
    this.getCards();
  }

  openDialog(event: any) {
    this.dialog.open(CardModalComponent, {
      width: '500px',
    });
  }

  getCards() {
    this.cardService.getCards().subscribe({
      next: (res) => {
        this.cardsList = res;
      },
      error: (err) => {
        console.error('Kartlar getirilirken hata oluştu:', err);
      },
      complete: () => {
      }
    });
  }

}
