import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {LayoutRoutingModule} from "./layout.routing.module";


@NgModule({
  declarations: [
    LayoutComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule {
}
