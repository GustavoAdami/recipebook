import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";

import { RecipesListService } from './recipes-list.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  displayedColumns: string[] = ['id', /*'userId',*/ 'recipeTitle', 'timeToPrepareInMinutes', 'calories', 'cautions', 'edit', 'delete', 'isFavorite'];
  dataSource = new MatTableDataSource<any>();

  selectedRecipe: Recipe = new Recipe();
  loading = false;

  favoritesFilter = false;
  filter: string;

  // typeOfFilter: boolean;

  constructor(public recipeService: RecipesListService, private router: Router){
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.recipeService.getRecipes();
    this.dataSource.data = data;
    this.loading = false;
  }

  createRecipe(){
    this.router.navigateByUrl('/newrecipe');
  }

	editRecipe(recipe: Recipe){
    this.selectedRecipe = recipe;
    console.log('Recipe Selected ' + this.selectedRecipe);
	}

	clearRecipe(){
		this.selectedRecipe = new Recipe();
	}

	// async deleteRecipe(recipe: Recipe){
	async deleteRecipe(id: number){
		this.loading = true;
		if(confirm(`Are you sure you want to delete the recipe ? This cannot be undone`)){
    // if(confirm(`Are you sure you want to delete the recipe ${recipe.recipeTitle}? This cannot be undone`)){
      // this.recipeService.deleteRecipe(Number.parseInt(recipe.id));
			this.recipeService.deleteRecipe(id);

		}
    this.refresh();
		this.refresh();

  }

  getRecord(recipe : Recipe){
    return recipe;
  }

  toggleFavorite(recipe: Recipe){
    recipe.isFavorite = !recipe.isFavorite;
    this.recipeService.updateRecipe(recipe);
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  filterFavorites = (value: boolean) => {
    this.favoritesFilter = !this.favoritesFilter;
    if(this.favoritesFilter)
      this.dataSource.filter = "true";
    else
    this.dataSource.filter = "false";
  }

  clearFilter() {
    this.favoritesFilter = false;
    this.dataSource.filter = "";
    this.filter = "";

  }





}
