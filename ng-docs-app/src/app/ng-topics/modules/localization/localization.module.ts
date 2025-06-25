import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {LocalizationRoutingModule} from "./localization-routing.module";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {AboutComponent} from "./components/about/about.component";
import {LocazitionComponent} from "./locazition.component";
import {TranslatePipe} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [
        LocazitionComponent,
        HomeComponent,
        AboutComponent,
        NavigationComponent,

    ],
    exports: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        LocalizationRoutingModule,
        FormsModule,
        HttpClientModule,

        //pipes
        TranslatePipe
    ]
})
export class LocalizationModule {
}
