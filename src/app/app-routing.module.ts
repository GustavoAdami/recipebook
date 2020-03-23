import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { RecipeComponent } from './recipe/recipe.component';
import { GNETComponent } from './gnet/gnet.component';

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
    path: 'gnet',
    component: GNETComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent,
    // canActivate: [OktaAuthGuard]
  }
  // {
  //   path: 'recipe',
  //   component: RecipeComponent,
  //   // canActivate: [OktaAuthGuard]
  // }
];

// Require authentication on every route
// routes.forEach(route => {
//   route.canActivate = route.canActivate || [];
//   route.canActivate.push(OktaAuthGuard);
// });

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
