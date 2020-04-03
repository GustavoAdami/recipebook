/**
 *  Author:         Gustavo Aquino Adami dos Santos
 *  Course:         CST8334 - Software Development Project
 *  File:           recipe-list.component.ts
 *  Summary:        Implementing behaviours of My Recipes Page
 */

 import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

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

  favoritesFilter: boolean;
  filter: string;

  constructor(public recipeService: RecipesListService, private router: Router){ }

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
	}

	clearRecipe(){
		this.selectedRecipe = new Recipe();
	}

	async deleteRecipe(id: number){
		this.loading = true;
		if(confirm(`Are you sure you want to delete the recipe ? This cannot be undone`)){
			this.recipeService.deleteRecipe(id);
		}
    this.refresh();
		this.refresh();
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
