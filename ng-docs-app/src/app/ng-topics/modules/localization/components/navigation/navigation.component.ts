import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent {
  dropdownOpen = false;
  currentLang = 'tr'; // Default language

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLang);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Prevent event bubbling
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeLanguage(language: string) {
    this.currentLang = language;
    this.translate.use(language);
    this.dropdownOpen = false; // Close dropdown after selection
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }
}
