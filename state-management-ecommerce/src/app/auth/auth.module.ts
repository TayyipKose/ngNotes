import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {LoginComponent} from "./components/login/login.component";
import {AuthRoutingModule} from "./auth.routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/register/register.component";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./state/auth.reducer";
import {HttpClientModule} from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      newestOnTop: true,
      enableHtml: false,
      maxOpened: 3,
      autoDismiss: true,
      toastClass: 'ngx-toastr toast-top-right custom-toast', // özelleştirebiliriz
    }),
  ]
})
export class AuthModule {
}
