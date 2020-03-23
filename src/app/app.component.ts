import { Component, OnInit } from '@angular/core';
// import { AppModule } from 'D:\\Documents\\Projetos\\CrudAngularNodeOkta\\okta-tutorial2\\RecipeBook\\src\\app\\app.module';
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


    // const userClaims = await this.oktaAuth.getUser();

    // // user name is exposed directly as property
    // this.userName = userClaims.email;
    // console.log(this.userName );
  }

  login() {
    this.oktaAuth.loginRedirect();

    // console.log("USERR " + this.homeService.user());
  }

  logout() {
    this.oktaAuth.logout('/');

    // window.location.reload();
    // window.location.href = 'http://localhost:4200/';
  }


}
