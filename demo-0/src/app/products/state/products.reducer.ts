import { createAction, createReducer, on } from "@ngrx/store";

export interface ProductState {
  showProductState: boolean,
}

const initialState: ProductState = {
  showProductState: true,
}

export const productsReducer = createReducer(
  initialState,
  on(createAction('[Products Page] Toggle Show Product Code'), (state) => ({
    ...state,
    showProductCode: !state.showProductState,
  }))
);
