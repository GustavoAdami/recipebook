"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modelRecipe_1 = require("./modelRecipe");
// import {getMongoRepository, getMongoManager} from "typeorm";
// import { OktaAuthService } from '@okta/okta-angular';
exports.router = express_1.Router();
exports.router.get('/recipes', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipeRepository = yield modelRecipe_1.getRecipeRepository();
            const allRecipes = yield recipeRepository.find({ where: { userId: req.body.user.email } });
            res.json(allRecipes);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/recipes/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipeRepository = yield modelRecipe_1.getRecipeRepository();
            const recipe = yield recipeRepository.findOne(req.params.id);
            res.json(recipe);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/recipes', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipeRepository = yield modelRecipe_1.getRecipeRepository();
            const recipe = new modelRecipe_1.Recipe();
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
            // console.log(`${recipe.userId}\n
            // ${recipe.recipeTitle}\n
            // ${recipe.ingredients}\n
            // ${recipe.howToPrepare}\n
            // ${recipe.timeToPrepareInMinutes}\n
            // ${recipe.calories}\n
            // ${recipe.nutritionalValue}\n
            // ${recipe.additionalInfo}\n
            // ${recipe.glutenFree}\n
            // ${recipe.vegan}\n
            // ${recipe.diabeticFriendly}\n
            // ${recipe.riskOfAllergies}\n
            // ${recipe.isFavorite}\n`);
            const result = yield recipeRepository.save(recipe);
            res.send(result);
            // res.sendStatus(200);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/recipes/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipeRepository = yield modelRecipe_1.getRecipeRepository();
            const recipe = yield recipeRepository.findOne({ id: req.body.id });
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
            // console.log(`${recipe.userId}\n
            // ${recipe.recipeTitle}\n
            // ${recipe.ingredients}\n
            // ${recipe.howToPrepare}\n
            // ${recipe.timeToPrepareInMinutes}\n
            // ${recipe.calories}\n
            // ${recipe.nutritionalValue}\n
            // ${recipe.additionalInfo}\n
            // ${recipe.glutenFree}\n
            // ${recipe.vegan}\n
            // ${recipe.diabeticFriendly}\n
            // ${recipe.riskOfAllergies}\n
            // ${recipe.isFavorite}\n`);
            const result = yield recipeRepository.save(recipe);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/recipes/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipeRepository = yield modelRecipe_1.getRecipeRepository();
            const result = yield recipeRepository.delete(req.params.id);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
