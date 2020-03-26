import { Component, OnInit, Inject, Optional, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HomeService } from './home.service';
import { JsonPipe } from '@angular/common';
import { json } from 'express';
import { element } from 'protractor';
// import {MatInputModule} from '@angular/material/input';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatDialogRef, PageEvent, MatPaginator } from '@angular/material';
import { Recipe } from '../recipes-list/recipe';
import { RecipesListService } from '../recipes-list/recipes-list.service';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import {of} from 'rxjs'
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';


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

  // HEALTH LABELS: 'alcohol-free', 'celery-free', 'crustacean-free', 'dairy-free', 'egg-free', 'fish-free',
  // 'fodmap-free', 'gluten-free', 'keto-friendly', 'kidney-friendly', 'kosher', 'low-potassium', 'lupine-free', 'mustard-free',
  // 'low-fat-abs', 'No-oil-added', 'low-sugar', 'paleo', 'peanut-free', 'pecatarian', 'pork-free', 'red-meat-free', 'sesame-free',
  // 'shellfish-free', 'soy-free', 'sugar-conscious', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'
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

  constructor(public homeService: HomeService, public dialog: MatDialog) {
  }

  ngOnInit() { }

  async searchRecipeByIngredient(ingredient: string) {
    // this.refresh();
    // this.dataSource = new MatTableDataSource<any>();

    this.loading = true;
    try {
      console.log('Health label: ' + this.healthLabels);

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

      // alert('Ingredient ' + ingredient);


      var recipesFoundJson = await this.homeService.searchRecipeByIngredient(ingredient, this.dietLabel, this.healthLabels);
    } catch (err) {
      this.loading = false;

      alert('Nothing was found with the given parameters');
    }
    recipesFoundJson.hits.forEach(element => {
      this.recipesFound.push(element.recipe);
      // console.log(element.recipe);


    });
    console.log(this.recipesFound);
    this.dataSource.data = this.recipesFound;

    this.loading = false;
  }

  recipeInformation() {
    alert('Recipe from Edaman - details');
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
      console.log('The dialog was closed', result);
      this.dialogValue = result.data;
    });
  }

  showDialog(recipe: Recipe) {
    var recipeFromEdamam = new Recipe();
    recipeFromEdamam = recipe;

    console.log("Printing recipe " + recipeFromEdamam.recipeTitle);

    const dialogRef = this.dialog.open(DialogComponent, {
      // width: '450px',
      // height: '200px',
      data: {
        pageValue: recipeFromEdamam
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.dialogValue = result.data;
    });

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

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log("DATA  " + data.pageValue.ingredientLines)
    this.fromPage = data.pageValue;

    this.arrayOfIngredients = this.fromPage.ingredientLines;

  }

  ngOnInit() {
  }

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

    console.log("PICTURE" + savingRecipeFromEdamam.linkToImage)

    this.recipeService.createRecipe(savingRecipeFromEdamam);

    this.closeDialog();
  }
}
