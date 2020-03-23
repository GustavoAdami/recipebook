import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
// import { Recipe } from '../recipes-list/recipe';

const baseUrl = 'https://api.edamam.com/search';
const app_id = '970858f6';
const app_key = 'ac0f73f1eb2db79758869491d634e148';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

	constructor(public oktaAuth: OktaAuthService, private http: HttpClient, ) {
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
			}
		});

		return new Promise<any>((resolve, reject) => {
			result.subscribe(resolve as any, reject as any);
		});
	}

  async searchRecipeByIngredient(ingredient : string, dietLabel: string){
    // ingredient = 'chicken';
    var searchPath = `${baseUrl}?q=${ingredient}&app_id=${app_id}&app_key=${app_key}`;

    console.log('SEARCHING BY INGREDIENT at HomeService: ' + ingredient + " diet = " + dietLabel);

    if(dietLabel != undefined && dietLabel != null && dietLabel != ''){
    console.log('THEREISS VALUEEE ' + dietLabel);

      searchPath += `&diet=${dietLabel}`;
      console.log('PATH  ' + searchPath);

    }

    return this.request('get', searchPath);
  }

  // async user(){
  //   const userClaims = await this.oktaAuth.getUser();

  //   // user name is exposed directly as property
  //   return userClaims.email;
  // }

}
