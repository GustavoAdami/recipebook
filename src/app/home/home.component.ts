import { Component, OnInit, Inject, Optional } from '@angular/core';
import { HomeService } from './home.service';
import { JsonPipe } from '@angular/common';
import { json } from 'express';
import { element } from 'protractor';
// import {MatInputModule} from '@angular/material/input';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Recipe } from '../recipes-list/recipe';
import { RecipesListService } from '../recipes-list/recipes-list.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ingredientToSearch : string;
  loading = false;
  recipesFound = [];

  displayedColumns: string[] = ['title', 'calories', 'cautions', 'dietLabels', 'healthLabels', 'totalTime', 'edit'];
  dataSource = new MatTableDataSource<any>();

  dietLabel: string;

  dialogValue:string;
  sendValue:string;

  constructor(public homeService: HomeService, public dialog: MatDialog){
  }

  ngOnInit() {

  }

  async searchRecipeByIngredient(ingredient : string){
    // this.refresh();
    console.log("Home Component ingredient: " + ingredient);
    this.loading = true;
    var recipesFoundJson = await this.homeService.searchRecipeByIngredient(ingredient, this.dietLabel);

      // var recipeJsonString = JSON.stringify(recipesFoundJson.hits);
      // var recipeJsonFim = JSON.parse(recipeJsonString);

      recipesFoundJson.hits.forEach(element => {
        this.recipesFound.push(element.recipe);
        console.log(element.recipe);


      });
      console.log(this.recipesFound);
      this.dataSource.data = this.recipesFound;

        // PAREI AQUI. MOSTRAR JSON NO TEXTAREA
        /**
         * Create Recipes based on the model.
         *  */


      this.loading = false;

  }


  recipeInformation(){
    alert('Recipe from Edaman - details');

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
      data: {
        pageValue: this.sendValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.dialogValue = result.data;
    });
  }

  showDialog(recipe: Recipe){
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
      console.log('The dialog was closed',result);
      this.dialogValue = result.data;
    });

  }

  clearSearchParams(){
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
  fromDialog:string;

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

  closeDialog(){
    this.dialogRef.close({event:'close'/*,data:this.fromDialog*/});
  }

  async saveRecipe(){
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
    alert('Recipe Created Successfully');
  }
}
