import { createReducer, on } from "@ngrx/store";
import { ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductState {
  showProductCode: boolean,
  loading: boolean,
  products: Product[],
}

const initialState: ProductState = {
  showProductCode: true,
  loading: false,
  products: [],
}

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductsCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true
  }))
);
