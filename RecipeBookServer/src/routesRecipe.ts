/**
 *  Author:         Nehemie Jibikila
 *  Course:         CST8334 - Software Development Project
 *  File:           routesMealPlanner.ts
 *  Summary:        Implements API endpoints that connect to database
 */

import { NextFunction, Request, Response, Router } from 'express';
import { getRecipeRepository,  Recipe } from './modelRecipe';

export const router: Router = Router();

router.get('/recipes', async function(req: Request, res: Response, next: NextFunction){
    try {
        const recipeRepository = await getRecipeRepository();
        const allRecipes = await recipeRepository.find({ where: { userId: req.body.user.email } });

        res.json(allRecipes);
    }
    catch (err) {
        return next(err);
    }
});

router.get('/recipes/:id', async function(req: Request, res: Response, next: NextFunction){
    try {
        const recipeRepository = await getRecipeRepository();
        const recipe = await recipeRepository.findOne(req.params.id);
        res.json(recipe);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/recipes', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const recipeRepository = await getRecipeRepository();
        const recipe = new Recipe();
        recipe.userId = req.body.userId;
        recipe.recipeTitle = req.body.recipeTitle;
        recipe.dietLabels = req.body.dietLabels;
        recipe.healthLabels = req.body.healthLabels;
        recipe.cautions = req.body.cautions;
        recipe.ingredients = req.body.ingredients;
        recipe.calories = req.body.calories;
        recipe.timeToPrepareInMinutes = req.body.timeToPrepareInMinutes;
        recipe.howToPrepare = req.body.howToPrepare;
        recipe.nutritionalValue = req.body.nutritionalValue;
        recipe.additionalInfo = req.body.additionalInfo;
        recipe.linkToImage = req.body.linkToImage;
        recipe.externalLink = req.body.externalLink;
        recipe.isFavorite = req.body.isFavorite == "true";

        const result = await recipeRepository.save(recipe);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/recipes/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const recipeRepository = await getRecipeRepository();
        const recipe = await recipeRepository.findOne({id: req.body.id});
        recipe.userId = req.body.userId;
        recipe.recipeTitle = req.body.recipeTitle;
        recipe.dietLabels = req.body.dietLabels;
        recipe.healthLabels = req.body.healthLabels;
        recipe.cautions = req.body.cautions;
        recipe.ingredients = req.body.ingredients;
        recipe.calories = req.body.calories;
        recipe.timeToPrepareInMinutes = req.body.timeToPrepareInMinutes;
        recipe.howToPrepare = req.body.howToPrepare;
        recipe.nutritionalValue = req.body.nutritionalValue;
        recipe.additionalInfo = req.body.additionalInfo;
        recipe.linkToImage = req.body.linkToImage;
        recipe.externalLink = req.body.externalLink;
        recipe.isFavorite = JSON.parse(req.body.isFavorite);

        const result = await recipeRepository.save(recipe);

        res.send(result);
    }
    catch (err) {
        return next(err);
    }
});

router.delete('/recipes/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const recipeRepository = await getRecipeRepository();
        const result = await recipeRepository.delete(req.params.id);
        res.send(result);
    }
    catch (err) {
        return next(err);
    }
});
