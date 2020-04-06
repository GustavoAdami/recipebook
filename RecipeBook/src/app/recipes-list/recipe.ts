/**
 *  Author:        Nehemie Jibikila
 *  Course:         CST8334 - Software Development Project
 *  File:           recipe.ts
 *  Summary:        Model of Recipe Entity
 */

 export class Recipe {
  id?: string;
  userId?: string;
  recipeTitle: string;
  dietLabels: string;
  healthLabels: string;
  cautions: string;
  ingredients: string;
  calories: number;
  timeToPrepareInMinutes: number;
  howToPrepare: string;
  nutritionalValue: string;
  additionalInfo: string;
  linkToImage: string;
  externalLink: string
  isFavorite: boolean;
}

