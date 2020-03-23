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
  MatFormFieldControl
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OktaAuthModule } from '@okta/okta-angular';
// import {DialogService} from './services/dialog.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, DialogComponent } from './home/home.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent, TesteDeArray } from './recipe/recipe.component';
import { GNETComponent } from './gnet/gnet.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealPlannerComponent,
    RecipesListComponent,
    RecipeComponent,
    TesteDeArray,
    DialogComponent,
    GNETComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    OktaAuthModule.initAuth({
      issuer: 'https://dev-810851.okta.com/oauth2/default',
      redirectUri: 'http://192.168.0.25:4200/implicit/callback',
      clientId: '0oa1a9g8grSMSPfQp4x6'
    }),
    FormsModule,
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