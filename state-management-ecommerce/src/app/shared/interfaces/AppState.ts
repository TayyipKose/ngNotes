import {ProductModel} from "../../layout/modules/products-modules/model/ProductModel";

export interface AppState {
  products: ProductModel;
  categories: [];
  users: [];
  orders: [];
  carts: [];
}
