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
    errorMessage: '',
    products: [],
  })),

  // added this to get displaying the products list to work
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),

  on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  })),

  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(ProductsAPIActions.productAddedSuccess, (state, {product}) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
  })),
  
  on(ProductsAPIActions.productAddedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),


  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productUpdatedSuccess, (state, {product}) => ({
    ...state,
    loading: false,
    products: state.products.map((existingProduct) =>
      existingProduct.id === product.id ? product: existingProduct
    ),
  })),
  on(ProductsAPIActions.productUpdatedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),


  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productDeletedSuccess, (state, {id}) => ({
    ...state,
    loading: false,
    products: state.products.filter((existingProduct) =>
      existingProduct.id !== id
    ),
  })),
  on(ProductsAPIActions.productDeletedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
);
