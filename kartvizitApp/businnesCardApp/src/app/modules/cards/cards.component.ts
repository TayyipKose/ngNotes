import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardModalComponent} from "./components/card-modal/card-modal.component";
import {CardService} from "./services/card.service";
import {ICARD} from "./model/ICARD";
import {FormControl, Validators} from "@angular/forms";
import {map} from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  searchFormControl = new FormControl('', [
    Validators.required
  ])
  filteredCards : ICARD[] = [];
  allCards: ICARD[] = [];

  constructor(
    private dialog: MatDialog,
    private cardService: CardService,
  ) {
  }


  ngOnInit(): void {
    this.cardService.getCards().subscribe(response => {
      this.allCards = response;
      this.filteredCards = [...response];
    });
  }

  openDialog(event: any) {
    const dialog = this.dialog.open(CardModalComponent, {
      width: '500px',
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.getCards();
      }
    })
  }

  getCards() {
    this.cardService.getCards().subscribe({
      next: (res) => {
        this.filteredCards = res.sort((a, b) => a.id - b.id); //k=>b id sort
      },
      error: (err) => {
        console.error('Kartlar getirilirken hata oluştu:', err);
      },
      complete: () => {
      }
    });
  }

  cardsComponentFiltered(searchText: string) {
    if (!searchText) {
      this.filteredCards = [...this.allCards];
    } else {
      this.filteredCards = this.allCards.filter(card =>
        card.name.toLowerCase().includes(searchText) ||
        card.title.toLowerCase().includes(searchText)
      );
    }
  }
}
