/**
 *  Author:         Elyssa Emanuel
 *  Course:         CST8334 - Software Development Project
 *  File:           meal-planner.component.ts
 *  Summary:        Implements methods for Meal Planner behaviours
 */

import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material';
import { MealPlanner } from './meal-planner';
import { RecipesListService } from '../recipes-list/recipes-list.service';
import { MealPlannerService } from './meal-planner.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  title = "Meal Planner";
  dataSource = new MatTableDataSource<any>();

  listOfRecipes = [];

  mealsTypes = ['Breakfast', 'Lunch', 'Dessert', 'Dinner', 'Supper'];

  mondayRecipes = ['', '', '', '', ''];

  tuesdayRecipes = ['', '', '', '', ''];

  wednesdayRecipes = ['', '', '', '', ''];

  thursdayRecipes = ['', '', '', '', ''];

  fridayRecipes = ['', '', '', '', ''];

  saturdayRecipes = ['', '', '', '', ''];

  sundayRecipes = ['', '', '', '', ''];

  constructor(public recipeService: RecipesListService, public mealPlannerService: MealPlannerService) { }

  ngOnInit() {
    this.refresh();
    this.loadMealPlanner();
  }

  async refresh() {
    const data = await this.recipeService.getRecipes();
    this.dataSource.data = data;
    this.putToList();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.data[event.previousIndex] == '') {
        return false;
      }

      if (event.container.data[event.currentIndex] === undefined) {
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

        event.container.data.splice(event.currentIndex - 1, 1);

        event.previousContainer.data[event.previousIndex] = '';

      } else if (event.container.data[event.currentIndex].length >= 0) {
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

        event.container.data.splice(event.currentIndex + 1, 1);
        event.previousContainer.data[event.previousIndex] = '';
      }
    }

    this.refresh();
  }

  putToList() {
    this.listOfRecipes = [];

    this.dataSource.data.forEach(element => {
      this.listOfRecipes.push(element.recipeTitle);
    });
  }

  removeItem(array, i) {
    array[i] = '';
  }

  clearPlanner() {
    if (confirm('Are you sure you want to clear the Meal Planner?')) {
      this.mondayRecipes = ['', '', '', '', ''];
      this.tuesdayRecipes = ['', '', '', '', ''];
      this.wednesdayRecipes = ['', '', '', '', ''];
      this.thursdayRecipes = ['', '', '', '', ''];
      this.fridayRecipes = ['', '', '', '', ''];
      this.saturdayRecipes = ['', '', '', '', ''];
      this.sundayRecipes = ['', '', '', '', ''];
    }
  }

  savePlanner() {
    let mealPlanner = new MealPlanner();
    mealPlanner.mondayRecipes = this.mondayRecipes.toString();
    mealPlanner.tuesdayRecipes = this.tuesdayRecipes.toString();
    mealPlanner.wednesdayRecipes = this.wednesdayRecipes.toString();
    mealPlanner.thursdayRecipes = this.thursdayRecipes.toString();
    mealPlanner.fridayRecipes = this.fridayRecipes.toString();
    mealPlanner.saturdayRecipes = this.saturdayRecipes.toString();
    mealPlanner.sundayRecipes = this.sundayRecipes.toString();

    this.mealPlannerService.saveMealPlanner(mealPlanner);
  }

  loadMealPlanner() {
    let mealPlanner = this.mealPlannerService.getMealPlanner();
    mealPlanner.then(element => {
      if (element !== undefined && element != null) {
        this.mondayRecipes = element.mondayRecipes.split(",");
        this.tuesdayRecipes = element.tuesdayRecipes.split(",");
        this.wednesdayRecipes = element.wednesdayRecipes.split(",");
        this.thursdayRecipes = element.thursdayRecipes.split(",");
        this.fridayRecipes = element.fridayRecipes.split(",");
        this.saturdayRecipes = element.saturdayRecipes.split(",");
        this.sundayRecipes = element.sundayRecipes.split(",");
      }
    });
  }
}
