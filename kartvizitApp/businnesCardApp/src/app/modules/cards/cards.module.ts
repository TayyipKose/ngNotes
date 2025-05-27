import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsRoutingModule} from './cards-routing.module';
import {CardsComponent} from './cards.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CardsListComponent} from "./components/cards-list/cards-list.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {CardModalComponent} from "./components/card-modal/card-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {CardService} from "./services/card.service";

export const API_URL = new InjectionToken<string>('apiUrl');

@NgModule({
  declarations: [
    CardsComponent,
    CardsListComponent,
    CardModalComponent,
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [CardService]
})
export class CardsModule {
}
