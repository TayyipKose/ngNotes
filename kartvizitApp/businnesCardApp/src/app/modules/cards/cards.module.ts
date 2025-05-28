import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CardSearchComponent} from "./components/card-search/card-search.component";



export const API_URL = new InjectionToken<string>('apiUrl');

@NgModule({
  declarations: [
    CardsComponent,
    CardsListComponent,
    CardModalComponent,
    CardSearchComponent,
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [CardService]
})
export class CardsModule {
}
