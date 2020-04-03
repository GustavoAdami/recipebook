/**
 *  Author:         Gustavo Aquino Adami dos Santos
 *  Course:         CST8334 - Software Development Project
 *  File:           recipe.component.ts
 *  Summary:        Implements behaviours of Recipe Screen
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipes-list/recipe';
import { RecipesListService } from '../recipes-list/recipes-list.service';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import { FormControl, FormGroup, FormArray, FormBuilder, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  form: FormGroup;

  constructor(private recipeService: RecipesListService, private route: ActivatedRoute, private router: Router, private _location: Location, private fb: FormBuilder, private oktaAuth: OktaAuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.recipeService.getRecipe(Number.parseInt(params.get('id'))).then(r =>{
          this.recipe = r;
        });
      }
    });
  }

  async updateRecipe(){
		if(this.recipe.id !== undefined){
      await this.recipeService.updateRecipe(this.recipe);
		} else {
      this.recipe.userId = (await this.oktaAuth.getUser()).email;

      if(this.recipe.recipeTitle === undefined || this.recipe.recipeTitle === null || this.recipe.recipeTitle == ''){
        alert('Recipe Title cannot be empty - Please try again');
        return;
      }

      if(this.recipe.timeToPrepareInMinutes === undefined || this.recipe.timeToPrepareInMinutes === null || this.recipe.timeToPrepareInMinutes == 0){
        alert('Time to Prepare cannot be empty - Please try again');
        return;
      }

      if(this.recipe.ingredients === undefined || this.recipe.ingredients === null || this.recipe.ingredients == ''){
        alert('Ingredients cannot be empty - Please try again');
        return;
      }

      await this.recipeService.createRecipe(this.recipe);
		}
		this.recipe = new Recipe();
    this._location.back();
  }

  clearRecipe(){
      this._location.back();
      this.recipe = new Recipe();
  }

  toggleFavorite(){
    this.recipe.isFavorite = !this.recipe.isFavorite;
  }
}
