import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CardsComponent} from "../../cards.component";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {
  mode='';
  isLoading = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
  });

  constructor(
    private cardService: CardService,
    private _dialogCardModal: MatDialogRef<CardModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private modalData:any,
  ) {
  }


  ngOnInit(): void {
    if (this.modalData) {
      this.mode = 'edit';  // Buradaki noktalı virgül string içinde olmamalı
      this.form.patchValue(this.modalData);
    } else {
      this.mode = 'add';
    }
  }
  loading(){
    this.isLoading = true;
  }
  hideLoading() {
    this.isLoading = false;
  }
  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach(control => control.markAsTouched());
  }
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) return `${controlName} zorunlu`;
    if (control?.hasError('minlength')) return `${controlName} en az 3 karakter olmalı`;
    if (control?.hasError('email')) return 'Geçerli bir e-posta girin';
    if (control?.hasError('min')) return `${controlName} en az 3 olmalı`;
    return '';
  }
  isFieldInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched ? true : false;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const payload = this.form.value;
      this.loading();
      if (this.mode === 'add') {
        this.cardService.addCard(payload).subscribe({
          next: (response) => {
          },
          error: (error) => {
            console.error('Kart ekleme sırasında hata oluştu:', error);
            this.hideLoading();
            this.openSnackBar('Kart ekleme başarısız oldu.', 'Kapat');
          },
          complete: () => {
            this._dialogCardModal.close(true);
            this.hideLoading();
            this.openSnackBar('Kartvizit Başarıyla Eklendi.', '');
          },
        });

      } else if (this.mode === 'edit') {
       const currentId = this.modalData.id;
        this.cardService.updateCard(payload,currentId).subscribe({
          next: (response) => {
          },
          error: (error) => {
            console.error('Kart güncelleme sırasında hata oluştu:', error);
            this.openSnackBar('Kart güncelleme başarısız oldu.', 'Kapat');
          },
          complete: () => {
            this._dialogCardModal.close(true);
            this.openSnackBar('Kartvizit Başarıyla Güncellendi.', '');
          }
        });
      }

      else if (this.mode === 'delete') {
        const currentId = this.modalData.id;
        this.cardService.updateCard(payload,currentId).subscribe({
          next: (response) => {
          },
          error: (error) => {
            console.error('Kart güncelleme sırasında hata oluştu:', error);
            this.openSnackBar('Kart güncelleme başarısız oldu.', 'Kapat');
          },
          complete: () => {
            this._dialogCardModal.close(true);
            this.openSnackBar('Kartvizit Başarıyla Güncellendi.', '');
          }
        });
      }
    } else {
      this.markAllFieldsAsTouched();
    }
  }
}

