import {createAction, props} from '@ngrx/store';

// Login denemesi başlatıldı
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()  // Email ve şifreyi gönderiyoruz
);

// Login başarılı olursa
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>()  // Kullanıcı bilgisi ve token gelir
);

// Login başarısız olursa
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()  // Hata mesajı gelir
);

/*
**Action Nedir?** Action, uygulamadaki bir olayı temsil eden nesnedir.
Örneğin “kullanıcı giriş yaptı” gibi. State yönetimine “Ne oldu?” bilgisini taşır ve genellikle bir tür (type) ile ilgili veriyi (payload) içerir.

  Yorum:
  - createAction: uygulamada gerçekleşecek olayları (event/action) tanımlıyoruz.
  - props: bu action ile taşınacak verinin şeklini belirler.
  - login: kullanıcı giriş denemesi başlattığında tetiklenir.
  - loginSuccess: giriş başarılı olduğunda, kullanıcı ve token bilgisi gelir.
  - loginFailure: giriş başarısızsa, hata mesajı gelir.

  Sıradaki adım reducer yazmak. Reducer bu action'ları dinler ve state (durum) günceller.
*/
