/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           home.component.ts
 *  Summary:        Defines behaviour of Home Screen implementing methods
 */

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { HomeService } from './home.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatDialogRef, PageEvent, MatPaginator } from '@angular/material';
import { Recipe } from '../recipes-list/recipe';
import { RecipesListService } from '../recipes-list/recipes-list.service';
import { OktaAuthService } from '@okta/okta-angular';

class ValueAndText {
  constructor(public value: string, public text: string) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ingredientToSearch: string;
  loading = false;
  recipesFound = [];

  displayedColumns: string[] = ['title', 'calories', 'cautions', 'dietLabels', 'healthLabels', 'totalTime', 'edit'];
  dataSource = new MatTableDataSource<any>();

  dietLabelsEdamam: ValueAndText[] = [
    new ValueAndText("balanced", "Balanced"),
    new ValueAndText("high-fiber", "High-Fiber"),
    new ValueAndText("high-protein", "High-Protein"),
    new ValueAndText("low-carb", "Low-Carb"),
    new ValueAndText("low-fat", "Low-Fat"),
    new ValueAndText("low-sodium", "Low-Sodium"),
  ]

  // Health Labels available at Edamam API page: https://developer.edamam.com/edamam-docs-recipe-api
  healthLabelsEdamam: ValueAndText[] = [
    new ValueAndText("alcohol-free", "Alcohol-free"),
    // new ValueAndText("celery-free", "Celery-free"),
    // new ValueAndText("crustacean-free", "Crustcean-free"),
    // new ValueAndText("dairy-free", "Dairy"),
    // new ValueAndText("egg-free", "Eggs"),
    // new ValueAndText("fish-free", "Fish"),
    // new ValueAndText("fodmap-free", "FODMAP free"),
    new ValueAndText("gluten-free", "Gluten-free"),
    // new ValueAndText("keto-friendly", "Keto"),
    // new ValueAndText("kidney-friendly", "Kidney friendly"),
    // new ValueAndText("kosher", "Kosher"),
    // new ValueAndText("low-potassium", "Low potassium"),
    // new ValueAndText("lupine-free", "Lupine-free"),
    // new ValueAndText("mustard-free", "Mustard-free"),
    // new ValueAndText("low-fat-abs", "n/a"),
    // new ValueAndText("No-oil-added", "No oil added"),
    // new ValueAndText("low-sugar", "No-sugar"),
    // new ValueAndText("paleo", "Paleo"),
    new ValueAndText("peanut-free", "Peanuts"),
    // new ValueAndText("pecatarian", "Pescatarian"),
    // new ValueAndText("pork-free", "Pork-free"),
    // new ValueAndText("red-meat-free", "Red meat-free"),
    // new ValueAndText("sesame-free", "Sesame-free"),
    // new ValueAndText("shellfish-free", "Shellfish"),
    // new ValueAndText("soy-free", "Soy"),
    new ValueAndText("sugar-conscious", "Sugar-conscious"),
    new ValueAndText("tree-nut-free", "Tree Nuts"),
    new ValueAndText("vegan", "Vegan"),
    new ValueAndText("vegetarian", "Vegetarian"),
    // new ValueAndText("wheat-free", "Wheat-free")
  ]

  dietLabel: string;
  healthLabels: string;

  dialogValue: string;
  sendValue: string;

  constructor(public homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit() { }

  async searchRecipeByIngredient(ingredient: string) {
    this.loading = true;
    try {
      if (ingredient == undefined || ingredient == null) {
        ingredient = '';
      }

      if(ingredient === '' && this.dietLabel === undefined && this.healthLabels === undefined){
        alert('Please provide some parameters');
        this.loading = false;
        return;
      }

      if(this.healthLabels == 'gluten-free'){
        ingredient += ' gluten-free';
        this.healthLabels = '';
      }

      var recipesFoundJson = await this.homeService.searchRecipeByIngredient(ingredient, this.dietLabel, this.healthLabels);
    } catch (err) {
      this.loading = false;
      alert('Nothing was found with the given parameters');
    }

    recipesFoundJson.hits.forEach(element => {
      this.recipesFound.push(element.recipe);
    });

    this.dataSource.data = this.recipesFound;

    this.loading = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: {
        pageValue: this.sendValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result.data;
    });
  }

  showDialog(recipe: Recipe) {
    var recipeFromEdamam = new Recipe();
    recipeFromEdamam = recipe;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        pageValue: recipeFromEdamam
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  clearSearchParams() {
    window.location.reload();
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  fromPage: any;
  fromDialog: string;

  arrayOfIngredients: [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public recipeService: RecipesListService,
    private oktaAuth: OktaAuthService,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fromPage = data.pageValue;
      this.arrayOfIngredients = this.fromPage.ingredientLines;
  }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close({ event: 'close'/*,data:this.fromDialog*/ });
  }

  async saveRecipe() {
    var savingRecipeFromEdamam = new Recipe();
    savingRecipeFromEdamam.userId = (await this.oktaAuth.getUser()).email;
    savingRecipeFromEdamam.recipeTitle = this.fromPage.label;
    savingRecipeFromEdamam.dietLabels = this.fromPage.dietLabels.toString();
    savingRecipeFromEdamam.healthLabels = this.fromPage.healthLabels.toString();
    savingRecipeFromEdamam.cautions = this.fromPage.cautions.toString();
    savingRecipeFromEdamam.ingredients = this.fromPage.ingredientLines.toString();
    savingRecipeFromEdamam.calories = this.fromPage.calories;
    savingRecipeFromEdamam.timeToPrepareInMinutes = this.fromPage.totalTime;
    savingRecipeFromEdamam.howToPrepare = this.fromPage.howToPrepare;
    savingRecipeFromEdamam.nutritionalValue = this.fromPage.nutritionalValue;
    savingRecipeFromEdamam.additionalInfo = this.fromPage.additionalInfo;
    savingRecipeFromEdamam.linkToImage = this.fromPage.image;
    savingRecipeFromEdamam.externalLink = this.fromPage.url;
    savingRecipeFromEdamam.isFavorite = this.fromPage.isFavorite;

    this.recipeService.createRecipe(savingRecipeFromEdamam);

    this.closeDialog();
  }
}
