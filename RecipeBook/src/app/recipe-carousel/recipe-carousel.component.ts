import { Component, OnInit } from '@angular/core';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'


// import { OverlayContainer } from '@angular/cdk/overlay';
// import { ElementRef, QueryList, ViewChildren } from '@angular/core';
// import { ThemePalette } from '@angular/material/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import {
//   MatCarouselSlideComponent,
//   Orientation
// } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css']
})
export class RecipeCarouselComponent implements OnInit {
  items = [{ title: 'Slide 1' }, { title: 'Slide 2' }, { title: 'Slide 3' },{ title: 'Slide 4' }];

  ngOnInit(){
    // for(var i = 0; i < this.slidesList.length; i++)
    //   this.slidesList.push('../../../RecipeBookLogo_2.1.png')
  }



}

