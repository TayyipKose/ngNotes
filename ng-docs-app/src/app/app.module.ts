import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';  // RouterModule import ediliyor
import {AppComponent} from './app.component';
import {BindingComponent} from './ng-topics/1-Binding/binding/binding.component';
import {AppRoutingModule} from './app.routing.module';  // AppRoutingModule import ediliyor
import {NavComponent} from './ng-topics/nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodoAppComponent} from "./ng-topics/1-Binding/todo-app/todo-app.component";
import {LoopsComponent} from "./ng-topics/2-Loops/loops/loops.component";
import {LoginComponent} from "./ng-topics/login/login.component";
import {LayoutComponent} from "./ng-topics/layout/layout.component";
import {DirectiveComponent} from "./ng-topics/4-Directive/directive/directive.component";
import {NumberFormatterDirective} from "./ng-topics/4-Directive/directive/directive-list/number-formatter.directive";
import {DisableCopyPasteDirective} from "./ng-topics/4-Directive/directive/directive-list/disable-copy-paste.directive";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductDetailComponent, ProductListComponent} from './ng-topics/5-Service/service';
import {PipeComponent} from "./ng-topics/6-Pipe/pipe/pipe.component";
import {YasHesaplamaPipe} from "./ng-topics/6-Pipe/yas-hesaplama.pipe";
import {GuardComponent} from "./ng-topics/7-Guard/guard/guard.component";
import {ParentComponent} from "./ng-topics/8-Input&Output/parent/parent.component";
import {ChildComponent} from "./ng-topics/8-Input&Output/child/child.component";
import {LocalstorageComponent} from "./ng-topics/9-LocalStorage/localstorage";
import {ApiRequestComponent} from "./ng-topics/10-ApiRequests/api.component";
import {FormComponent} from "./ng-topics/11-Form/form/form.component";
import {InterceptorsComponent} from "./ng-topics/12-Interceptors/interceptors.component";
import {AuthInterceptor} from "./ng-topics/12-Interceptors/AuthInterceptor";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ObservableComponent} from "./ng-topics/15-rxjs/Observable/observable/observable.component";
import {ObserverComponent} from "./ng-topics/15-rxjs/Observer/observer/observer.component";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    PipeComponent,
    GuardComponent,
    ParentComponent,
    ChildComponent,
    LocalstorageComponent,
    ApiRequestComponent,
    FormComponent,
    InterceptorsComponent,
    ObservableComponent,
    ObserverComponent,

    //Directives
    NumberFormatterDirective,
    DisableCopyPasteDirective,

    //Pipes
    YasHesaplamaPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule,  // RouterModule burada import ediliyor
    AppRoutingModule,  // AppRoutingModule burada import ediliyor
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    NumberFormatterDirective,
    DisableCopyPasteDirective,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, //interceptorlarımızı buraya ekliyoruz
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
