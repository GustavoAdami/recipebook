/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           routesMealPlanner.ts
 *  Summary:        Implements API endpoints that connect to database
 */

import { NextFunction, Request, Response, Router } from 'express';
import { getMealPlannerRepository, MealPlanner } from './modelMealPlanner';

export const router: Router = Router();

router.get('/mealplanner', async function(req: Request, res: Response, next: NextFunction){
    try {
        const mealPlannerRepository = await getMealPlannerRepository();
        const mealPlanner = await mealPlannerRepository.findOne({ where: { userId: req.body.user.email } });

        res.json(mealPlanner);
    }
    catch (err) {
        return next(err);
    }
});

router.post('/mealplanner', async function(req: Request, res: Response, next: NextFunction){
  try {
      const mealPlannerRepository = await getMealPlannerRepository();

      let mealPlanner = await mealPlannerRepository.findOne({ where: { userId: req.body.userId } });

      if(mealPlanner === undefined || mealPlanner == null){
        mealPlanner = new MealPlanner();
      }

      mealPlanner.userId = req.body.userId;
      mealPlanner.mondayRecipes = req.body.mondayRecipes;
      mealPlanner.tuesdayRecipes = req.body.tuesdayRecipes;
      mealPlanner.wednesdayRecipes = req.body.wednesdayRecipes;
      mealPlanner.thursdayRecipes = req.body.thursdayRecipes;
      mealPlanner.fridayRecipes = req.body.fridayRecipes;
      mealPlanner.saturdayRecipes = req.body.saturdayRecipes;
      mealPlanner.sundayRecipes = req.body.sundayRecipes;

      const result = await mealPlannerRepository.save(mealPlanner);

      res.send(result);
  }
  catch (err) {
      return next(err);
  }
});

