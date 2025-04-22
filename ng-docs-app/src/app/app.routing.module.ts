import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BindingComponent} from './ng-topics/1-Binding/binding/binding.component';
import {TodoAppComponent} from "./ng-topics/1-Binding/todo-app/todo-app.component";
import {LoopsComponent} from "./ng-topics/2-Loops/loops/loops.component";
import {LoginComponent} from "./ng-topics/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Boş path login'e yönlendiriliyor
  { path: 'login', component: LoginComponent },
  {path: 'binding', component: BindingComponent},
  {path: 'todo', component: TodoAppComponent},
  {path: 'loops', component: LoopsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // RouterModule.forRoot() ile yönlendirme işlemleri tanımlanır
  exports: [RouterModule]  // RouterLink ve diğer yönlendirme özelliklerini export ederiz
})
export class AppRoutingModule {
}
