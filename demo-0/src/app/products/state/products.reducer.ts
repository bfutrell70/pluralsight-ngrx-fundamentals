import { createReducer, on } from "@ngrx/store";
import { ProductsPageActions } from "./products.actions";

export interface ProductState {
  showProductCode: boolean,
}

const initialState: ProductState = {
  showProductCode: true,
}

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductsCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  }))
);
