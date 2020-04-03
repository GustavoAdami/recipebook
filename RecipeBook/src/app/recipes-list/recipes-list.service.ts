/**
 *  Author:         Gustavo Aquino Adami dos Santos
 *  Course:         CST8334 - Software Development Project
 *  File:           recipe-list.service.ts
 *  Summary:        Supporting database connection for My Recipes Page
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Recipe } from './recipe';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class RecipesListService {
  currentUser = this.oktaAuth.getUser();

	constructor(public oktaAuth: OktaAuthService, private http: HttpClient) { }

	private async request(method: string, url: string, data?: any) {
		const token = await this.oktaAuth.getAccessToken();

		const result = this.http.request(method, url, {
      body: data,
			responseType: 'json',
			observe: 'body',
			headers: {
        Authorization: `Bearer ${token}`
      },
      params: { }
		});

		return new Promise<any>((resolve, reject) => {
			result.subscribe(resolve as any, reject as any);
		});
	}

	async getRecipes(){
		return this.request('get', `${baseUrl}/recipes`, this.currentUser);
	}

	async getRecipe(id: number) {
		return this.request('get', `${baseUrl}/recipes/${id}`, this.currentUser);
	}

	createRecipe(recipe: Recipe) {
		return this.request('post', `${baseUrl}/recipes`, recipe);
	}

	updateRecipe(recipe: Recipe) {
		return this.request('post', `${baseUrl}/recipes/${recipe.id}`, recipe);
	}

	deleteRecipe(id: number) {
		return this.request('delete', `${baseUrl}/recipes/${id}`);
  }
}
