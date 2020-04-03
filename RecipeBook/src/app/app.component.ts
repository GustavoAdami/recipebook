/**
 *  Author:         Gustavo Aquino Adami dos Santos
 *  Course:         CST8334 - Software Development Project
 *  File:           app-component.ts
 *  Summary:        Implements behaviours of login/logout in the toolbar
 */

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../app/home/home.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Recipe Book';
  public isAuthenticated: boolean;
  public userName: string;

  constructor(public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = true
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect();
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
