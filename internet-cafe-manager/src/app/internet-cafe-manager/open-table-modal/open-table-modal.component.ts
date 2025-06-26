import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-open-table-modal',
  templateUrl: './open-table-modal.component.html',
  styleUrls: ['./open-table-modal.component.scss']
})
export class OpenTableModalComponent implements OnInit {
  tableForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OpenTableModalComponent>
  ) { }

  ngOnInit(): void {
    this.tableForm = this.fb.group({
      hours: ['', [
        Validators.required,
        Validators.pattern(/^(\d+)(.\d{1})?$/),
        (control: AbstractControl) => {
          if (!control.value) return null;
          const val = control.value.replace(',', '.');
          const num = parseFloat(val);
          return num % 0.5 === 0 ? null : { invalidStep: true };
        }
      ]],
      description: ['']
    });
  }

  onHoursBlur(): void {
    const control = this.tableForm.get('hours');
    if (!control) return;

    let val: string = control.value || '';
    if (val) {
      val = val.replace(',', '.');
      const num = parseFloat(val);
      if (!isNaN(num) && num % 0.5 === 0) {
        const formattedValue = num % 1 === 0 ? num.toString() : num.toFixed(1);
        control.setValue(formattedValue.replace('.', ','), { emitEvent: false });
      } else {
        control.setValue('', { emitEvent: false });
      }
    }
  }

  onHoursInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9,\.]/g, '');
    const decimalSeparators = value.match(/[,\.]/g);
    if (decimalSeparators && decimalSeparators.length > 1) {
      value = value.substring(0, value.length - 1);
    }

    input.value = value;
    this.tableForm.get('hours')?.setValue(value);
  }

  openTable(): void {
    if (this.tableForm.valid) {
      let val = this.tableForm.get('hours')?.value;
      val = val.replace(',', '.');
      const hours = parseFloat(val);

      this.dialogRef.close({
        hours,
        description: this.tableForm.get('description')?.value || ''
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
