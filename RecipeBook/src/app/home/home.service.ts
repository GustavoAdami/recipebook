/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           home.service.ts
 *  Summary:        Service for interacting with database server
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
// const config = require('config');
import config from '../../../config/config.json';

const baseUrl = config.edamam.baseUrl;
const app_id = config.edamam.app_id;
const app_key = config.edamam.app_key;
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
