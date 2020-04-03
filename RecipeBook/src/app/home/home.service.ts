/**
 *  Author:         Nicholas Lafrance
 *  Course:         CST8334 - Software Development Project
 *  File:           home.service.ts
 *  Summary:        Service for interacting with database server
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';

const baseUrl = 'https://api.edamam.com/search';
const app_id = '970858f6';
const app_key = 'ac0f73f1eb2db79758869491d634e148';
const numberOfResults = 50;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

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

  async searchRecipeByIngredient(ingredient: string, dietLabel: string, healthLabels?: string) {
    var searchPath = `${baseUrl}?q=${ingredient}&app_id=${app_id}&app_key=${app_key}&to=${numberOfResults}`;

    if (dietLabel != undefined && dietLabel != null && dietLabel != '') {
      searchPath += `&diet=${dietLabel}`;
    }

    if (healthLabels != undefined && healthLabels != null && healthLabels.length > 0) {
      searchPath += `&health=${healthLabels}`
    }

    return this.request('get', searchPath);
  }
}
