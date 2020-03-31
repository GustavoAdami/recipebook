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
const modelMealPlanner_1 = require("./modelMealPlanner");
exports.router = express_1.Router();
exports.router.get('/mealplanner', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mealPlannerRepository = yield modelMealPlanner_1.getMealPlannerRepository();
            const mealPlanner = yield mealPlannerRepository.findOne({ where: { userId: req.body.user.email } });
            res.json(mealPlanner);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/mealplanner', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mealPlannerRepository = yield modelMealPlanner_1.getMealPlannerRepository();
            let mealPlanner = yield mealPlannerRepository.findOne({ where: { userId: req.body.userId } });
            if (mealPlanner === undefined || mealPlanner == null) {
                mealPlanner = new modelMealPlanner_1.MealPlanner();
            }
            mealPlanner.userId = req.body.userId;
            mealPlanner.mondayRecipes = req.body.mondayRecipes;
            mealPlanner.tuesdayRecipes = req.body.tuesdayRecipes;
            mealPlanner.wednesdayRecipes = req.body.wednesdayRecipes;
            mealPlanner.thursdayRecipes = req.body.thursdayRecipes;
            mealPlanner.fridayRecipes = req.body.fridayRecipes;
            mealPlanner.saturdayRecipes = req.body.saturdayRecipes;
            mealPlanner.sundayRecipes = req.body.sundayRecipes;
            const result = yield mealPlannerRepository.save(mealPlanner);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
