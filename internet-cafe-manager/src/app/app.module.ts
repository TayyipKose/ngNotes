import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IcmTablesComponent} from './internet-cafe-manager/components/icm-tables/icm-tables.component';
import {TableDetailsComponent} from './internet-cafe-manager/components/table-details/table-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderMenuComponent} from './internet-cafe-manager/components/header-menu/header-menu.component';
import {PaginationComponent} from './internet-cafe-manager/components/pagination/pagination.component';
import {LockComponent} from './internet-cafe-manager/components/lock/lock.component';
import {OpenTableModalComponent} from './internet-cafe-manager/open-table-modal/open-table-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import { EndTablesComponent } from './internet-cafe-manager/components/end-tables/end-tables.component';
import { AddTableComponent } from './internet-cafe-manager/components/add-table/add-table.component';
import { NavComponent } from './internet-cafe-manager/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    IcmTablesComponent,
    TableDetailsComponent,
    HeaderMenuComponent,
    PaginationComponent,
    LockComponent,
    OpenTableModalComponent,
    EndTablesComponent,
    AddTableComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
