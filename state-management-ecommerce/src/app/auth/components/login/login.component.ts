import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, filter} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as AuthActions from '../../state/auth.actions';
import * as AuthSelectors from '../../state/auth.selectors';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  private subscriptions: Subscription[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);

    // loading$ Observable'dan gelen değeri isLoading ile eşitle
    const loadingSub = this.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    // Hata olduğunda Toastr göster
    const errorSub = this.error$
      .pipe(filter(error => !!error))
      .subscribe(error => {
        this.toastr.error(error!, 'Giriş Hatası');
      });

    // Kullanıcı login olursa başarı toastr ve yönlendirme
    const tokenSub = this.store.select(AuthSelectors.selectToken)
      .pipe(filter(token => !!token))
      .subscribe(() => {
        this.toastr.success('Giriş başarılı', 'Hoş geldin!');
        this.router.navigateByUrl('layout');
      });

    this.subscriptions.push(loadingSub, errorSub, tokenSub);
  }
  onSubmit(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.store.dispatch(AuthActions.login({ email: username, password }));
    }
  }

  private showLoading() {
    this.isLoading = true;
  }
  private hideLoading() {
    this.isLoading = false;
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}


/**
 Açıklama:

 1. Reactive Form oluşturduk: username ve password alanları, ikisi de zorunlu.
 2. Store'dan loading ve error durumlarını Observable olarak aldık, bunlar UI'da gösterilebilir.
 3. error$ Observable'ına abone olarak, hata varsa Toastr ile kullanıcıya hata mesajı gösteriyoruz.
 4. selectUser Observable'ına abone olarak, kullanıcı login olunca başarılı mesajı gösterip '/layout' sayfasına yönlendiriyoruz.
 5. onSubmit() fonksiyonu, form geçerliyse login action'ını store'a dispatch ediyor.

 Genel Akış:
 Kullanıcı formu doldurup submit eder →
 login action dispatch edilir →
 NGRX Effect API'yi çağırır →
 API sonucu başarılı veya hatalı state'e yansır →
 Component state değişikliklerini selectorlar ile dinler →
 Hata varsa Toastr ile gösterilir, başarılı ise yönlendirme yapılır.

 Notlar:
 - Abonelikler şu an iptal edilmiyor, bu memory leak oluşturabilir. Bunu önlemek için ngOnDestroy'da unsubscribe yapılmalı.
 - Toastr ile bildirim gösterimi UX için önemli.
 - Router ile sayfa yönlendirme yapılıyor.
 - Reactive form ve NGRX store birlikte kullanılarak güçlü bir state yönetimi sağlanıyor.
 */
