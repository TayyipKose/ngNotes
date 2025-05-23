import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pipe-chain',
  template: ``
})
export class PipeChainComponent implements OnInit {
  ngOnInit(): void {
    const users$ = of(
      { id: 1, name: 'Ali' },
      { id: 2, name: 'Ayşe' },
      { id: 3, name: 'Ali' },
      { id: 4, name: 'Mehmet' }
    );

    users$
      .pipe(
        filter(user => user.id >= 2),// Sadece id 2 veya büyük olanlar
        map(user => ({ ...user, name: user.name.toUpperCase() })), // İsmini büyük harfe çevir
        delay(1000) // 1 sn gecikme koyuyoruz
      )
      .subscribe(result => {
        console.log('✅ İşlenen kullanıcı:', result);
      });
  }
}
