import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material';

import { RecipesListService } from '../recipes-list/recipes-list.service';


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

  async refresh(){
    const data = await this.recipeService.getRecipes();
    this.dataSource.data = data;
  }

  mealsTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Supper'
  ];

  mondayRecipes = [
    // 'Get to work',
    // 'Pick up groceries',
    // 'Go home',
    // 'Fall asleep'
    // '','','',''
  ];

  tuesdayRecipes = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
  ];

  wednesdayRecipes = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
  ];

  thursdayRecipes = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
  ];

  fridayRecipes = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
  ];

  saturdayRecipes = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',

  ];

  sundayRecipes = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
  ];

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // if(event.container.data[event.currentIndex] == ''){
      //   console.log('REPLACING DATA empty' );
      //   // delete event.container.data[event.currentIndex];


      //   transferArrayItem(event.previousContainer.data,
      //     event.container.data,
      //     event.previousIndex,
      //     event.currentIndex);

      //   event.container.data.splice(event.currentIndex, 1);


      //     return true;

      // }

      if (event.container.data.length >= 4) {
        alert("Impossible to add Recipe to that day. Your meal planner is full");
        return false;
      }



      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

                        this.refresh();
    }

  }

  removeItem(event, i){
    console.log('DELTE)');
    console.log('DATAA ' +  event)
        event.container.data.splice(i, 1);

  }

}
