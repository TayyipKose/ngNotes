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
import {GuardComponent} from "./ng-topics/7-Guard/guard/guard.component";
import {AuthGuard} from './ng-topics/7-Guard/auth.guard';
import {ParentComponent} from "./ng-topics/8-Input&Output/parent/parent.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},  // login URL'sine LoginComponent ile eşleştiriyoruz
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Varsayılan yönlendirme
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Guard Kontrol ekliyoruz!
    canActivateChild: [AuthGuard], // Alt yolları koru
    children: [
      {path: '', redirectTo: 'binding', pathMatch: 'full'},
      {path: 'binding', component: BindingComponent},
      {path: 'todo', component: TodoAppComponent},
      {path: 'loops', component: LoopsComponent},
      {path: 'directive', component: DirectiveComponent},
      {path: 'service', component: ProductListComponent, canDeactivate: [AuthGuard]},
      {path: 'service/product/:id', component: ProductDetailComponent},
      {path: 'pipe', component: PipeComponent},
      {path: 'guard', component: GuardComponent},
      {path: 'ınput&output', component: ParentComponent},

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
