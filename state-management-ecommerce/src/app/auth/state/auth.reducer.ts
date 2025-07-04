import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

// AuthState arayüzü, auth modülünün state yapısını tanımlar
export interface AuthState {
  user: any | null;        // Giriş yapan kullanıcı bilgisi, yoksa null
  token: string | null;    // Token, yoksa null
  loading: boolean;        // İşlem devam ediyor mu?
  error: string | null;    // Hata mesajı varsa buraya
}

// Başlangıç state'i (uygulama ilk açıldığında)
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Reducer fonksiyonu: Gelen action'a göre yeni state üretir
export const authReducer = createReducer(
  initialState,

  // login action başladığında loading true yapılır, hata temizlenir
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // loginSuccess action geldiğinde kullanıcı ve token state'e yazılır, loading kapanır
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    user: null,  // çünkü user yok api response'da
    loading: false,
    error: null,
  })),

  // loginFailure action geldiğinde hata state'e yazılır, loading kapanır
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

/**
 * Açıklama:
 * - Reducer: State'i güncelleyen saf fonksiyondur.
 * - Her action'a karşılık gelen on() fonksiyonu state'i nasıl değiştireceğimizi belirler.
 * - InitialState uygulama ilk açıldığında kullanılacak varsayılan bilgidir.
 * - Örneğin, login action tetiklendiğinde loading=true olur ki UI'da yükleniyor gösterilsin.
 * - loginSuccess'te kullanıcı ve token bilgileri kaydedilir.
 * - loginFailure'de hata mesajı tutulur.
 *
 * Böylece, uygulama login sürecini ve durumunu store'da yönetiriz.
 */
