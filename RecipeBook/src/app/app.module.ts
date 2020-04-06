/**
 *  Author:         Gustavo Aquino Adami dos Santos
 *  Course:         CST8334 - Software Development Project
 *  File:           app-module.ts
 *  Summary:        Compiles all imported modules into the application
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatDialogModule,
  MatDialogRef,
  MatInputModule,
  MatFormFieldControl,
  MatCardModule,
  MatGridListModule,
  MatPaginatorModule,
  PageEvent
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OktaAuthModule } from '@okta/okta-angular';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, DialogComponent } from './home/home.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import config from '../../config/config.json';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealPlannerComponent,
    RecipesListComponent,
    RecipeComponent,
    DialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    OktaAuthModule.initAuth({
      issuer: config.okta.issuer,
      redirectUri: config.okta.redirectUri,
      clientId: config.okta.clientId
    }),
    FormsModule,
    MatCarouselModule.forRoot(),
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
