import { Component } from '@angular/core';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: [],
})
export class GuardComponent {
  // Angular Guard Yöntemleri: canActivate, canActivateChild, canDeactivate
  // Bu yöntemler AuthGuard gibi bir Guard sınıfında tanımlanır (senin auth.guard.ts dosyan gibi).
  // Mevcut routing'de (app-routing.module.ts) AuthGuard, /layout ve alt yollarını koruyor.
  // Aşağıda her yöntemin ne yaptığını ve senin projende nasıl kullanılabileceğini anlatıyorum:

  // 1. canActivate
  // - Ne yapar? Bir route’a (ör. /layout) girmeden önce izin kontrolü yapar.
  // - Senin projende: AuthGuard’da canActivate, localStorage’da isLoggedIn: true’yu kontrol ediyor.
  //   - True dönerse /layout açılır.
  //   - False dönerse /login’e yönlendirir.
  // - Kullanım: Şu anda /layout’ta aktif: { path: 'layout', canActivate: [AuthGuard] }.
  // - Örnek: Kullanıcı giriş yapmadıysa /layout’a giremez.

  // 2. canActivateChild
  // - Ne yapar? Ana route’un alt yollarına (ör. /layout/binding, /layout/todo) girmeden önce kontrol yapar.
  // - Senin projende: /layout’un children’ları (binding, todo, loops vb.) için kullanılabilir.
  // - Nasıl eklenir? AuthGuard’a implements CanActivateChild ekleyip:
  //   canActivateChild(): boolean {
  //     return this.canActivate(); // Aynı kontrolü kullanabilirsin
  //   }
  //   Sonra routing’de: { path: 'layout', canActivateChild: [AuthGuard], children: [...] }.
  // - Örnek: /layout/binding’e giderken giriş kontrolü yapar.

  // 3. canDeactivate
  // - Ne yapar? Bir sayfadan çıkmadan önce kontrol yapar (ör. formda değişiklik var mı?).
  // - Senin projende: Örneğin, /layout/service’de bir form varsa, kaydedilmemiş veriyle çıkmayı engelleyebilir.
  // - Nasıl eklenir? AuthGuard’a implements CanDeactivate ekleyip:
  //   canDeactivate(component: any): boolean {
  //     return confirm('Değişiklikler kaydedilmedi, çıkmak istiyor musunuz?');
  //   }
  //   Sonra routing’de: { path: 'service', canDeactivate: [AuthGuard] }.
  // - Örnek: Kullanıcı /layout/service’den çıkarken uyarı gösterir.

  // Özet:
  // - canActivate: Senin AuthGuard’da zaten kullanılıyor, /layout’u koruyor.
  // - canActivateChild: /layout’un alt yollarını (todo, loops vb.) korumak için eklenebilir.
  // - canDeactivate: Sayfadan çıkışı kontrol etmek için (ör. form koruması) eklenebilir.
  // - Not: Bu yöntemler AuthGuard gibi bir .ts dosyasında tanımlanır, GuardComponent bir component olduğu için burada sadece mantığı öğreniyorsun.
}
