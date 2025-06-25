import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IcmTablesComponent } from './internet-cafe-manager/components/icm-tables/icm-tables.component';
import { TableDetailsComponent } from './internet-cafe-manager/components/table-details/table-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderMenuComponent } from './internet-cafe-manager/components/header-menu/header-menu.component';
import { PaginationComponent } from './internet-cafe-manager/components/pagination/pagination.component';
import { LockComponent } from './internet-cafe-manager/components/lock/lock.component';
import { OpenTableModalComponent } from './internet-cafe-manager/open-table-modal/open-table-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    IcmTablesComponent,
    TableDetailsComponent,
    HeaderMenuComponent,
    PaginationComponent,
    LockComponent,
    OpenTableModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
