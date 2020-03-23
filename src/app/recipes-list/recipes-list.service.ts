import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Recipe } from './recipe';

const baseUrl = 'http://192.168.0.25:4201';

@Injectable({
  providedIn: 'root'
})
export class RecipesListService {
  currentUser = this.oktaAuth.getUser();

	constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
	}

	private async request(method: string, url: string, data?: any) {
		const token = await this.oktaAuth.getAccessToken();
    console.log('request ' + JSON.stringify(data));

		const result = this.http.request(method, url, {
      body: data,
			responseType: 'json',
			observe: 'body',
			headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        // userId: user
      }
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
		console.log('createRecipe ' + JSON.stringify(recipe));
		return this.request('post', `${baseUrl}/recipes`, recipe);
	}

	updateRecipe(recipe: Recipe) {
		console.log('updateRecipe ' + JSON.stringify(recipe));
		return this.request('post', `${baseUrl}/recipes/${recipe.id}`, recipe);
	}

	deleteRecipe(id: number) {
    console.log('deleteRecipe ' + id);
		return this.request('delete', `${baseUrl}/recipes/${id}`);
  }

  getRecord(id: number){
    console.log(id + ' cell clicked');
  }

}
