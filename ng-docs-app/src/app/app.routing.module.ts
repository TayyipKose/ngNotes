import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BindingComponent} from './ng-topics/1-Binding/binding/binding.component';
import {TodoAppComponent} from "./ng-topics/1-Binding/todo-app/todo-app.component";
import {LoopsComponent} from "./ng-topics/2-Loops/loops/loops.component";
import {LoginComponent} from "./ng-topics/login/login.component";
import {LayoutComponent} from "./ng-topics/layout/layout.component";
import {DirectiveComponent} from "./ng-topics/4-Directive/directive/directive.component";
import {ProductDetailComponent, ProductListComponent} from "./ng-topics/5-Service/service";
import {PipeComponent} from "./ng-topics/6-Pipe/pipe/pipe.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'binding', pathMatch: 'full'},
      {path: 'binding', component: BindingComponent},
      {path: 'todo', component: TodoAppComponent},
      {path: 'loops', component: LoopsComponent},
      {path: 'directive', component: DirectiveComponent},
      { path: 'service', component: ProductListComponent },
      { path: 'service/product/:id', component: ProductDetailComponent },
      { path: 'pipe', component: PipeComponent },

    ]
  },
  {path: '**', redirectTo: '/login'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],  // RouterModule.forRoot() ile yönlendirme işlemleri tanımlanır
  exports: [RouterModule]  // RouterLink ve diğer yönlendirme özelliklerini export ederiz
})
export class AppRoutingModule {
}
