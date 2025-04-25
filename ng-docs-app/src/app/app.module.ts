import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';  // RouterModule import ediliyor
import {AppComponent} from './app.component';
import {BindingComponent} from './ng-topics/1-Binding/binding/binding.component';
import {AppRoutingModule} from './app.routing.module';  // AppRoutingModule import ediliyor
import {NavComponent} from './ng-topics/nav/nav.component';
import {FormsModule} from '@angular/forms';
import {TodoAppComponent} from "./ng-topics/1-Binding/todo-app/todo-app.component";
import {LoopsComponent} from "./ng-topics/2-Loops/loops/loops.component";
import {LoginComponent} from "./ng-topics/login/login.component";
import {LayoutComponent} from "./ng-topics/layout/layout.component";
import {DirectiveComponent} from "./ng-topics/4-Directive/directive/directive.component";
import {NumberFormatterDirective} from "./ng-topics/4-Directive/directive/directive-list/number-formatter.directive";
import {DisableCopyPasteDirective} from "./ng-topics/4-Directive/directive/directive-list/disable-copy-paste.directive";
import {HttpClientModule} from "@angular/common/http";
import {ProductDetailComponent, ProductListComponent } from './ng-topics/5-Service/service';

@NgModule({
  declarations: [
    //Components
    AppComponent,
    BindingComponent,
    NavComponent,
    TodoAppComponent,
    LoopsComponent,
    LoginComponent,
    LayoutComponent,
    DirectiveComponent,
    ProductListComponent,
    ProductDetailComponent,

    //Directives
    NumberFormatterDirective,
    DisableCopyPasteDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule,  // RouterModule burada import ediliyor
    AppRoutingModule,  // AppRoutingModule burada import ediliyor
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    NumberFormatterDirective,
    DisableCopyPasteDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
