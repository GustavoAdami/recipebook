import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipes-list/recipe';
import { RecipesListService } from '../recipes-list/recipes-list.service';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import { FormControl, FormGroup, FormArray, FormBuilder, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  form: FormGroup;
  // ingredientsInArray: string[];
  // ingredientBeingAdded: string;

  constructor(private recipeService: RecipesListService, private route: ActivatedRoute, private router: Router, private _location: Location, private fb: FormBuilder, private oktaAuth: OktaAuthService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.recipeService.getRecipe(Number.parseInt(params.get('id'))).then(r =>{
          this.recipe = r;
          // this.ingredientsInArray = this.recipe.ingredients.split(',')
        })
      }
    });

  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      username: '',
      password: '',
    }));
  }

  async updateRecipe(){
		if(this.recipe.id !== undefined){
      await this.recipeService.updateRecipe(this.recipe);
      alert('Recipe Edited Successfully');
		} else {
      this.recipe.userId = (await this.oktaAuth.getUser()).email;

      await this.recipeService.createRecipe(this.recipe);
      alert('Recipe Created Successfully');
		}
		this.recipe = new Recipe();
    this._location.back();

  }

  clearRecipe(){
    if(confirm(`Are you sure you want to cancel? This cannot be undone`)){
      this._location.back();
      this.recipe = new Recipe();
    }

  }

  // addIngredient(){
  //   this.ingredientsInArray.push('');
  //   // this.recipe.ingredients += "|" + this.ingredientBeingAdded;
  // }

  // deleteIngredient(i: number, ingredient: string){
  //   console.log(i);
  //   // this.recipe.ingredients = this.recipe.ingredients.replace(new RegExp('/.n/'), '');
  //   this.ingredientsInArray.splice(i, 1);
  // }

  toggleFavorite(){
    this.recipe.isFavorite = !this.recipe.isFavorite;
    // this.recipeService.updateRecipe(recipe);
  }


}

@Component({
  selector: 'my-app',
  template: `
    <form [formGroup]="form">

        <h2>Credentials</h2>
        <button (click)="addCreds()">Add</button>

        <div formArrayName="credentials" *ngFor="let creds of form.controls.credentials?.value; let i = index">
          <ng-container [formGroupName]="i">
            <input placeholder="Ex: 1/2 cup of milk" formControlName="ingredient">
          </ng-container>
        </div>

    </form>
  `,
})
export class TesteDeArray  {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      ingredient: ''
    }));
  }
}
