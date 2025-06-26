import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OpenTableModalComponent} from "../../open-table-modal/open-table-modal.component";
import {EndTablesComponent} from "../end-tables/end-tables.component";

@Component({
  selector: 'app-icm-tables',
  templateUrl: './icm-tables.component.html',
  styleUrls: ['./icm-tables.component.scss']
})
export class IcmTablesComponent implements OnInit {
  @ViewChild(EndTablesComponent) endTablesComponent!: EndTablesComponent; // app-end-tables referansı
  masalar: any = [
    {
      id: 1,
      dolu: true,
      baslangic: new Date(2025, 5, 25, 8, 0, 0), // 25 Haziran 2025 08:00:00
      bitis: new Date(2025, 5, 25, 10, 49, 0), // 10:46
      detay: 'Oyun modu - VR hazır',
      ucret: 175
    },
    {
      id: 2,
      dolu: false,
      ucret: 0
    },
    {
      id: 3,
      dolu: true,
      baslangic: new Date('2025-06-25T09:15:00'),
      bitis: new Date('2025-06-25T10:35:00'),
      detay: 'Sadece internet',
      ucret: 50
    },
    {
      id: 4,
      dolu: true,
      baslangic: new Date('2025-06-25T10:00:00'),
      bitis: new Date('2025-06-25T14:22:00'),
      detay: 'Turnuva Modu',
      ucret: 150
    },
    {
      id: 5,
      dolu: false,
      ucret: 0
    },
    {
      id: 6,
      dolu: true,
      baslangic: new Date('2025-06-25T12:31:00'),
      bitis: new Date('2025-06-25T14:31:15'),
      detay: 'Minecraft oynanıyor',
      ucret: 100
    },
    {
      id: 7,
      dolu: true,
      baslangic: new Date('2025-06-25T10:30:00'),
      bitis: new Date('2025-06-25T12:50:00'),
      detay: 'VR Hazır',
      ucret: 200
    },
    {
      id: 8,
      dolu: false,
      ucret: 0
    },
    {
      id: 9,
      dolu: true,
      baslangic: new Date('2025-06-25T06:00:00'),
      bitis: new Date('2025-06-25T10:00:00'),
      detay: 'LoL oynanıyor',
      ucret: 90
    },
    {
      id: 10,
      dolu: true,
      baslangic: new Date('2025-06-25T09:30:00'),
      bitis: new Date('2025-06-25T12:00:00'),
      detay: 'Fortnite',
      ucret: 120
    },
    {
      id: 11,
      dolu: false,
      ucret: 0
    },
    {
      id: 12,
      dolu: true,
      baslangic: new Date('2025-06-25T11:00:00'),
      bitis: new Date('2025-06-25T13:59:00'),
      detay: 'Valorant',
      ucret: 180
    },
    {
      id: 13,
      dolu: true,
      baslangic: new Date('2025-06-25T12:00:00'),
      bitis: new Date('2025-06-25T14:00:00'),
      detay: 'Yarış oyunu',
      ucret: 150
    },
    {
      id: 14,
      dolu: false,
      ucret: 0
    }
  ];
  currentClock: Date = new Date();
  hoursPrice = 50;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.currentClock = new Date();
    this.otomatikMasaKapatma();

    setInterval(() => {
      this.currentClock = new Date();
      this.otomatikMasaKapatma();
    }, 50);
    this.cd.detectChanges();
  }

  get bitmesine45DakikaKalanMasalar(): any[] {
    const now = this.currentClock.getTime();
    return this.masalar
      .filter((masa: any) => masa.dolu && masa.bitis && (new Date(masa.bitis).getTime() - now) > 0 && (new Date(masa.bitis).getTime() - now) < 45 * 60 * 1000)
      .sort((a: any, b: any) => (new Date(a.bitis).getTime() - now) - (new Date(b.bitis).getTime() - now))
      .slice(0, 10);
  }



  otomatikMasaKapatma() {
    const now = this.currentClock;
    this.masalar.forEach((masa: any) => {
      if (masa.dolu && masa.bitis && masa.bitis < now) {
        masa.dolu = false;
        masa.baslangic = null;
        masa.bitis = null;
        masa.detay = '';
        masa.ucret = 0;
      }
    });
    this.cd.detectChanges();
    this.endTablesComponent?.updateList(); // Masa kapandığında app-end-tables listesini güncelle
  }

  openTable(masa: any) {
    const dialogRef = this.dialog.open(OpenTableModalComponent, {
      width: '500px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const rawHours = result.hours?.toString().replace(',', '.');
        const hours = parseFloat(rawHours);

        if (isNaN(hours) || hours <= 0) {
          return;
        }

        const now = new Date();
        masa.dolu = true;
        masa.baslangic = now;

        const bitis = new Date(now.getTime() + hours * 60 * 60 * 1000);
        masa.bitis = bitis;

        masa.detay = result.description || '';
        masa.ucret = hours * this.hoursPrice;
        this.currentClock = new Date();

        this.cd.detectChanges();
        this.endTablesComponent.updateList(); // Yeni masa açıldığında app-end-tables listesini güncelle
      }
    });
  }

  sureUzat(masa: any) {
    if (!masa.dolu || !masa.bitis) {
      return;
    }
    masa.bitis = new Date(masa.bitis.getTime() + 1 * 60 * 60 * 1000);
    masa.ucret = masa.ucret + 50;
    this.cd.detectChanges();
    this.endTablesComponent.updateList(); // Süre uzatıldığında app-end-tables listesini güncelle
  }

  closeTab(masa: any) {
    masa.baslangic = null;
    masa.bitis = null;
    masa.detay = '';
    masa.ucret = 0;
    masa.dolu = false;
    this.cd.detectChanges();
    this.endTablesComponent.updateList(); // Masa kapandığında app-end-tables listesini güncelle
  }

  // Pagination fonksiyonları aynı kalıyor
  pageSize = 12;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.masalar.length / this.pageSize);
  }

  get pageMasalar(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.masalar.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
}
