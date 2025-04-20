import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // RouterModule import ediliyor
import { AppComponent } from './app.component';
import { BindingComponent } from './ng-topics/1-Binding/binding/binding.component';
import { AppRoutingModule } from './app.routing.module';  // AppRoutingModule import ediliyor
import { NavComponent } from './ng-topics/nav/nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,  // RouterModule burada import ediliyor
    AppRoutingModule,  // AppRoutingModule burada import ediliyor
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
