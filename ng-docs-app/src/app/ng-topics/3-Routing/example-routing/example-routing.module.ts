import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// region
class HomeComponent {}
class AboutComponent {}
class UserDetailComponent {}
class ParentComponent {}
class ChildComponent {}
class ProtectedComponent {}

// endregion

// @ts-ignore
const routes: Routes = [
  // Temel yönlendirmeler
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  // Dinamik parametreler (id parametresi)
  { path: 'user/:id', component: UserDetailComponent },

  // Yönlendirme
  { path: 'old-path', redirectTo: '/new-path', pathMatch: 'full' },

  // Çocuk route'lar (nested routes)
  { path: 'parent', component: ParentComponent, children: [
      { path: 'child', component: ChildComponent }
    ]},

  // Lazy loading (tembel yükleme)
  //=> { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) },

  // route koruma (guards)
  { path: 'protected', component: ProtectedComponent, canActivate: [] }, // boş guard taklit edildi

  // Varsayılan yönlendirme (404 sayfası gibi)
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // RouterModule.forRoot() ile yönlendirme işlemleri tanımlanır
  exports: [RouterModule]  // RouterLink ve diğer yönlendirme özelliklerini export ederiz
})
export class ExampleRoutingModule { }

/*
path: URL'ye karşılık gelen yol.
component: Bu route’a karşılık gelen bileşen.
redirectTo: Belirli bir yol üzerinden başka bir yola yönlendirme.
pathMatch: Yolu eşleştirmenin tam mı (full) yoksa prefix'e göre mi (prefix) yapılacağını belirtir.
children: Çocuk route'lar ile iç içe yönlendirme.
loadChildren: Lazy loading ile modül yükleme.
canActivate: Yönlendirme yapılmadan önce guard (koruma) kontrolü yapar.
**: Wildcard kullanılarak tüm eşleşmeyen yollar 404 gibi bir sayfaya yönlendirilir.
*/
