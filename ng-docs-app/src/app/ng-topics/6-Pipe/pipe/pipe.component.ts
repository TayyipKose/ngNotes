import { Component } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: [], // css dosyası sildiğimizden boş bir list tanımlıyoruz
})
export class PipeComponent {
  // Kullanıcı listesi
  users: any = [
    { name: 'Mehmet Ates', birthDate: '1995-06-12' },
    { name: 'Zeynep Demir', birthDate: '1998-11-22' },
    { name: 'Tuğba Aslan', birthDate: '1996-03-07' }
  ];
}
