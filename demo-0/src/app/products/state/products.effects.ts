import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";

import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { ProductsService } from "../products.service";

@Injectable()
export class ProductEffects {

  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() => 
        this.productsService.getAll().pipe(
          map((products) => 
            ProductsAPIActions.productsLoadedSuccess({ products })
          ),
          catchError(
            (error) => of(ProductsAPIActions.productsLoadedFail({ message: error}))
          )
        )
      )
    )
  );

  addProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      concatMap(({product}) => 
        this.productsService.add(product).pipe(
          map((newProduct) => 
            ProductsAPIActions.productAddedSuccess({ product: newProduct })
          ),
          catchError((error) => 
            of(ProductsAPIActions.productAddedFail({ message: error}))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({product}) => 
        this.productsService.update(product).pipe(
          map(() => ProductsAPIActions.productUpdatedSuccess({ product })),
          catchError(
            (error) => of(ProductsAPIActions.productUpdatedFail({ message: error}))
          )
        )
      )
    )
  )

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({id}) => 
        this.productsService.delete(id).pipe(
        map((newProduct) => ProductsAPIActions.productDeletedSuccess({ id })),
        catchError(
          (error) => of(ProductsAPIActions.productDeletedFail({ message: error }))
        )
      ))
    )
  )

  // navigates to '/products' if the actions passed to it are of type
  // productAddedSuccess, productDeletedSuccess, or productUpdatedSuccess
  // 'dispatch: false' will not trigger more actions
  redirectToProductsPage = createEffect(
    () => this.actions$.pipe(
      ofType(
        ProductsAPIActions.productAddedSuccess,
        ProductsAPIActions.productDeletedSuccess,
        ProductsAPIActions.productUpdatedSuccess
      ),
      tap(() => this.router.navigate(['/products']))
    ),
    { dispatch: false }
  )

  // best practice is to have the constructor under the class variables
  constructor(private router: Router, private actions$: Actions, private productsService: ProductsService) {

  }
}
