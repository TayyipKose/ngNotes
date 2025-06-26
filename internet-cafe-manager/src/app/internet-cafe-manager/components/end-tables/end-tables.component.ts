import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-end-tables',
  templateUrl: './end-tables.component.html',
  styleUrls: ['./end-tables.component.scss']
})
export class EndTablesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() endTablesList: any[] = [];
  filteredList: any[] = [];
  private intervalId: any;

  ngOnInit(): void {
    this.updateList();

    this.intervalId = setInterval(() => {
      this.updateList();
    }, 60 * 1000); // Her 60 saniyede bir güncelle
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endTablesList']) {
      this.updateList(); // endTablesList değiştiğinde listeyi güncelle
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateList() {
    const now = new Date().getTime();

    this.filteredList = this.endTablesList
      .filter(masa => {
        if (!masa.bitis) return false;
        const bitisTime = new Date(masa.bitis).getTime();
        const kalanSure = bitisTime - now;
        return kalanSure > 0 && kalanSure < 45 * 60 * 1000;
      })
      .sort((a, b) => {
        const kalanA = new Date(a.bitis).getTime() - now;
        const kalanB = new Date(b.bitis).getTime() - now;
        return kalanA - kalanB;
      })
      .slice(0, 10);
  }

  kalanDakikaHesapla(bitis: string): number {
    const now = new Date().getTime();
    const bitisTime = new Date(bitis).getTime();
    const kalanMs = bitisTime - now;
    return Math.floor(kalanMs / 60000);
  }
}
