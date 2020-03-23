// export class Recipe {
//     id?: string;
//     userId?: string;
//     recipeTitle: string;
//     ingredients: string;
//     howToPrepare: string;
//     timeToPrepareInMinutes: number;
//     calories: number;
//     nutritionalValue: string;
//     additionalInfo: string;
//     glutenFree: boolean;
//     vegan: boolean;
//     diabeticFriendly: boolean;
//     riskOfAllergies: boolean;
//     isFavorite: boolean;
// }

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

