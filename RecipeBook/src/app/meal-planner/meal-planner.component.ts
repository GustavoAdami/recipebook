import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material';

import { RecipesListService } from '../recipes-list/recipes-list.service';
import { compileNgModule } from '@angular/compiler';


@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  title = "Meal Planner";
  dataSource = new MatTableDataSource<any>();

  constructor(public recipeService: RecipesListService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    const data = await this.recipeService.getRecipes();
    this.dataSource.data = data;
    this.putToList();
  }

  putToList() {
    this.listOfRecipes = [];

    this.dataSource.data.forEach(element => {
      // console.log(element.recipeTitle);
      this.listOfRecipes.push(element.recipeTitle);

    });
  }

  listOfRecipes = [];

  mealsTypes = [
    'Breakfast',
    'Lunch',
    'Dessert',
    'Dinner',
    'Supper'
  ];

  mondayRecipes = [
    '', '', '', '', ''
  ];

  tuesdayRecipes = [
    '', '', '', '', ''
  ];

  wednesdayRecipes = [
    '', '', '', '', ''
  ];

  thursdayRecipes = [
    '', '', '', '', ''
  ];

  fridayRecipes = [
    '', '', '', '', ''
  ];

  saturdayRecipes = [
    '', '', '', '', ''
  ];

  sundayRecipes = [
    '', '', '', '', ''
  ];

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      console.log('Same container');

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Other container');
      if (event.previousContainer.data[event.previousIndex] == '') {
        return false;
      }

      if (event.container.data[event.currentIndex] === undefined) {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        event.container.data.splice(event.currentIndex - 1, 1);

        event.previousContainer.data[event.previousIndex] = '';

      } else if (event.container.data[event.currentIndex].length >= 0) {
        console.log(`REPLACING DATA - ${event.container.data[event.currentIndex]} at index ${event.currentIndex}`);

        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        event.container.data.splice(event.currentIndex + 1, 1);
        event.previousContainer.data[event.previousIndex] = '';
      }
    }

    this.refresh();

  }

  removeItem(array, i) {
    array[i] = '';
  }

}
