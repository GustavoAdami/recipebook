/**
 *  Author:         Elyssa Emanuel
 *  Course:         CST8334 - Software Development Project
 *  File:           meal-planner.service.ts
 *  Summary:        Supports Meal Planner connection with database
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { MealPlanner } from './meal-planner';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class MealPlannerService {
  currentUser = this.oktaAuth.getUser();

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient, ) { }

  private async request(method: string, url: string, data?: any) {
    const token = await this.oktaAuth.getAccessToken();

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  async getMealPlanner(){
		return this.request('get', `${baseUrl}/mealplanner`, this.currentUser);
  }

  async saveMealPlanner(mealplanner: MealPlanner){
    mealplanner.userId = (await this.oktaAuth.getUser()).email;
		return this.request('post', `${baseUrl}/mealplanner`, mealplanner);
  }
}
