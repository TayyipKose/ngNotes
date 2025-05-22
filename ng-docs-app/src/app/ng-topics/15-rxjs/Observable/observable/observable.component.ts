import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable',
  template: ``,
  styleUrls: []
})
export class ObservableComponent implements OnInit {
  ngOnInit(): void {
    const _observable = new Observable<string>(data => {
      data.next('Akışa veri eklemek için arrow function içinde .next() ile data ekeleyebiliriz');
      data.next('Merhaba Dünya 123');
      data.complete(); //bunu yazmazsak observabler devamlı açık kalıp data bekler, dinler o yüzden işimiz bitince belirtmeliyiz...
    });


    //observable'a data ekledik şimdi ona abone olalım
    _observable.subscribe(data=>{
      console.log(data);
    });




    /*
      abone olduktan sonra bizden ne isteniyor Observer nesnesi isteniyor
      Observer nedir? Observable nesneleri tüketen nesnelere Observer diyoruz.
      Observable ile Observer Farkı Nedir? birisi gözetlenebilir birisi gözetleyici=> gözleyen ilgili nesneleri tüketen olacaktır haliyle observer
      observe dediğimiz aslında kısaca şudur: _observable.subscribe("res=>{}") tırnak içindeki kısımdır yani aslında bir fonksiyon bir arrow fonksiyondur.
    */
  }


}
