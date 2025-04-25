import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yasHesaplama'
})
export class YasHesaplamaPipe implements PipeTransform {

// Doğum tarihinden yaş hesaplama
  transform(value: string): number {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
