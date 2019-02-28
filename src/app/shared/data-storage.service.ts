import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    // return this.httpClient.put('https://ng-recipe-book-ac641.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    // });

    const request = new HttpRequest('PUT','https://ng-recipe-book-ac641.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)});

    return this.httpClient.request( request );
  }

  getRecipes() {
    const token = this.authService.getToken();

    //this.httpClient.get<Recipe[]>('https://ng-recipe-book-ac641.firebaseio.com/recipes.json?auth=' + token)

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-ac641.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json',
        params: new HttpParams().set('auth', token)
      })
      .map(
        (recipes) => {
          console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
