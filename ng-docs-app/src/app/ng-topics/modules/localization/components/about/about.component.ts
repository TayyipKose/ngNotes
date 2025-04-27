import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: []
})
export class AboutComponent {
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    // Varsayılan dil ayarı
    this.translate.setDefaultLang('en');
  }

  // Dil değiştirme fonksiyonu
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  // Ana sayfaya yönlendiren fonksiyon
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
