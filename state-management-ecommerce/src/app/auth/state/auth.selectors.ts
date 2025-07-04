import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

/*
  Açıklama - Selectors Nedir ve Nasıl Çalışır?

  1. Store’da uygulamanın tüm durumu (state) tutulur. Bu state çok büyük olabilir.
  2. Selectors, store’dan sadece ihtiyacımız olan **küçük parçaları** (slice) almak için kullanılır.
  3. createFeatureSelector ile 'auth' modülüne ait tüm state seçilir.
  4. createSelector ile bu state’den user, loading, error gibi spesifik parçalar seçilir.
  5. Componentlerde bu selectorlar çağrılır ve otomatik olarak güncel veriyi alırız.
  6. Böylece componentler store’un iç detaylarından soyutlanır, sadece ihtiyaç duydukları veriye erişir.
  7. Selectors performans için optimize edilmiştir; gereksiz hesaplamaları engeller.

  Örnek:
    selectUser(store) => kullanıcı bilgisi
    selectAuthLoading(store) => yükleniyor durumu

  Bu yapıyla uygulama state yönetimi daha düzenli, okunabilir ve kolay olur.
*/
