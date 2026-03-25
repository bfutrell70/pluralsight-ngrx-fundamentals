import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductState {
  showProductCode: boolean,
  loading: boolean,
  products: Product[],
  errorMessage: string
}

const initialState: ProductState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: ''
}

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductsCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    products: [],

  })),
  // added this to get displaying the products list to work
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    products: products,
    errorMessage: '',
    loading: false
  })),
  on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  })),
);
