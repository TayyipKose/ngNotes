import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IcmTablesComponent} from "./internet-cafe-manager/components/icm-tables/icm-tables.component";

const routes: Routes = [
  {path: '', component: IcmTablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
