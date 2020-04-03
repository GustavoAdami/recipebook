/**
 *  Author:         Gustavo Aquino Adami dos Santos
 *  Course:         CST8334 - Software Development Project
 *  File:           app-routing.module.ts
 *  Summary:        Defines routing for pages in the application
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'recipes',
    component: RecipesListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'recipes/:id',
    component: RecipeComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'newrecipe',
    component: RecipeComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'weeklyplanner',
    component: MealPlannerComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent,
    // canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
