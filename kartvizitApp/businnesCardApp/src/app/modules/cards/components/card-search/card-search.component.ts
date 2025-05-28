import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardService} from "../../services/card.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {
  @Input() formControl? = new FormControl('');
  @Output() cardSearchComponentSearchText = new EventEmitter<string>();

  onSearch(text: string) {
    this.cardSearchComponentSearchText.emit(text.trim().toLowerCase());
  }
}
