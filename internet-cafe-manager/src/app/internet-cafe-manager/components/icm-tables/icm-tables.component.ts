import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-icm-tables',
  templateUrl: './icm-tables.component.html',
  styleUrls: ['./icm-tables.component.scss']
})
export class IcmTablesComponent implements OnInit {
  masalar: any = [
    {
      id: 1,
      dolu: true,
      baslangic: new Date('2025-06-25T08:00:00'),
      bitis: new Date('2025-06-25T11:30:00'),
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
      bitis: new Date('2025-06-25T11:15:00'),
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

  onTimeChanged(newTime: Date) {
    this.currentClock = newTime;
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentClock = new Date();
    this.mainTableOff();

    setInterval(() => {
      this.currentClock = new Date();
      this.mainTableOff();
    }, 1000);
    this.cd.detectChanges();
  }


  selectedTable(event: any) {

  }

  mainTableOff() {
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
  }

  closeTab(masa: any) {
    masa.baslangıc = null,
      masa.bitis = null,
      masa.detay = '',
      masa.ucret = 0,
      masa.dolu = false
  }

//pagination fonksiyonları
  pageSize = 12; //
  currentPage = 1;

  get totalPages()
    :
    number {
    return Math.ceil(this.masalar.length / this.pageSize);
  }

  get pageMasalar()
    :
    any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.masalar.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page
             :
             number
  ) {
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
