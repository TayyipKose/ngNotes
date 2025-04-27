import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LocazitionComponent } from './locazition.component';
import {TranslateModule} from "@ngx-translate/core"; // Ana layout component

const routes: Routes = [
  {
    path: '', // Bu, localization module'ü içeren ana URL olacak
    component: LocazitionComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: '/localization/home', pathMatch: 'full' }, // Default route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class LocalizationRoutingModule {}
