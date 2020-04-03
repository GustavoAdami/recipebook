/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           modelMealPlanner.ts
 *  Summary:        Database model of Meal Planner
 */

import { Entity, Column, createConnection, Connection, Repository, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class MealPlanner {
  @PrimaryColumn()
  userId: string;

  @Column()
  mondayRecipes: string;

  @Column()
  tuesdayRecipes: string;

  @Column()
  wednesdayRecipes: string;

  @Column()
  thursdayRecipes: string;

  @Column()
  fridayRecipes: string;

  @Column()
  saturdayRecipes: number;

  @Column()
  sundayRecipes: number;
}

let connection: Connection;

export async function getMealPlannerRepository(): Promise<Repository<MealPlanner>> {
  if (connection === undefined) {
    connection = await createConnection({
      name: 'dbConnMealPlanner',
      type: 'sqlite',
      database: 'mealplannersqldb',
      synchronize: true,
      entities: [
        MealPlanner
      ],
    });
  }
  return connection.getRepository(MealPlanner);
}
