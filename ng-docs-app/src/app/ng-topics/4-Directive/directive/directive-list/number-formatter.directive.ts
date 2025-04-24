import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormatter]'
})
export class NumberFormatterDirective {
  private lastValue = '';

  constructor(
    private el: ElementRef,
    @Optional() private control: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput() {
    const input = this.el.nativeElement as HTMLInputElement;
    // Nokta ve sayıları koru, diğer karakterleri sil
    const cleaned = input.value.replace(/[^0-9.]/g, '');

    // Birden fazla nokta varsa sonrakileri sil
    const parts = cleaned.split('.');
    let formattedValue = parts[0];
    if (parts.length > 1) {
      formattedValue += '.' + parts[1].replace(/\./g, '');
    }

    if (this.control) {
      this.control.control?.setValue(formattedValue, { emitEvent: false });
    } else {
      input.value = formattedValue;
    }

    this.lastValue = formattedValue;
  }

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement as HTMLInputElement;
    const val = this.control ? this.control.control?.value : input.value;

    if (val && !isNaN(Number(val))) {
      // Eğer değerde nokta yoksa formatla (tam sayıysa)
      if (val.indexOf('.') === -1 && val !== '') {
        const formatted = parseFloat(val).toFixed(2);

        if (this.control) {
          this.control.control?.setValue(formatted, { emitEvent: false });
        } else {
          input.value = formatted;
        }
      }
    }
  }
}
