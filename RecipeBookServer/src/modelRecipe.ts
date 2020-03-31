import { Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository, PrimaryColumn, Generated } from 'typeorm';
// var mongoose = require('mongoose');

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  recipeTitle: string;

  @Column({ nullable: true })
  dietLabels: string;

  @Column({ nullable: true })
  healthLabels: string;

  @Column({ nullable: true })
  cautions: string;

  @Column()
  ingredients: string;

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  timeToPrepareInMinutes: number;

  @Column({ nullable: true })
  howToPrepare: string;

  @Column({ nullable: true })
  nutritionalValue: string;

  @Column({ nullable: true })
  additionalInfo: string;

  @Column({ nullable: true })
  linkToImage: string;

  @Column({ nullable: true })
  externalLink: string;

  // @Column({ nullable: true })
  // linkToImage: string;

  @Column('boolean')
  @Column({ nullable: true })
  isFavorite: boolean;


}

let connection: Connection;


export async function getRecipeRepository(): Promise<Repository<Recipe>> {
  if (connection === undefined) {
    connection = await createConnection({
      name: 'dbConnRecipe',
      type: 'sqlite',
      database: 'recipebooksqldb',
      synchronize: true,
      entities: [
        Recipe
      ],
    });
  }
  return connection.getRepository(Recipe);
}
