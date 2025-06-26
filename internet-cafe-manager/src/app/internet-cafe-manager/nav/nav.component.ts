import {Component, ViewChild} from '@angular/core';
import {EndTablesComponent} from "../components/end-tables/end-tables.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild(EndTablesComponent) endTablesComponent!: EndTablesComponent; // app-end-tables referansı
  currentClock: Date = new Date();

  constructor() {
  }

  onTimeChanged(newTime: Date) {
    this.currentClock = newTime;
    this.endTablesComponent.updateList(); // Saat değiştiğinde app-end-tables listesini güncelle
  }
}
