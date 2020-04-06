# RecipeBook
RecipeBook is the Angular client.
RecipeBookServer is the application server.

First, you need to install Node and npm (https://nodejs.org/en/download/)

## Build and Deploy
Once Node and npm are installed, clone the repo - https://github.com/GustavoAdami/recipebook
Open Command Prompt and navigate to directory where you cloned the repo.

You have to run command below in both directories: recipebook\RecipeBook and recipebook\RecipeBookServer. Navigate to one directory, run command, navigate to second directory, run command.

Run `npm i` to download the project dependencies.

## Okta Identity Provider
Recipe Book uses Okta* as an identity manager provider. So you have to create an developer/admin account in Okta, add an application, generate a client ID and update the code as described in the tutorial.
https://developer.okta.com/signup

* Please check the tutorial for Okta we provided in the word document.

##Edamam API
Recipe Book uses Edamam API** to retrive recipes from the web. You need an API key to make the request. Please create and Edaman developer account, generate API Key and update the code as described in the tutorial.
https://developer.edamam.com/

** Please check the tutorial for Edamam we provided in the word document.  

## Run
Navigate to recipebook\RecipeBookServer\src and run `npx tsc` to compile the project (every time a change is made in the RecipeBookServer, you should compile it)
Now run `node ..\dist\server.js` to start the application server.

Open another Command Prompt and navigate to RecipeBook.
Run `ng serve -o` to compile and start the Angular client.
Your browser should open automatically at `http://localhost:4200/` (Port that Angular listens to). Angular will automatically reload if you change any of the source files and save.

You should be able to start the application.

If you make changes in the application server code, it will NOT refresh automatically like Angular. 

Stop the terminal where it is running by pressing `CTRL+C` until it stops and run the compile command. Then start the server again.

## Errors
In case of errors in the Build process, check in the Command Prompts for missing npm packages. You might need to install then manually. 
For example: package "typeorm"

Go to `https://www.npmjs.com/` and search the package name stated in the error message. You will find the command to install it in the website. 
For package "typeorm", it would be `npm i typeorm`.

## Database
A local SQLite database file is created in RecipeBookServer root directory

## Directory structure
RecipeBook
+-- src
|   +-- app
|   |   +-- home
|   |   |   +-- dialog.component.css
|   |   |   +-- dialog.component.html
|   |   |   +-- home.component.css
|   |   |   +-- home.component.html
|   |   |   +-- home.component.ts
|   |   |   +-- home.service.ts
|   |   +-- meal-planner
|   |   |   +-- meal.planner.component.css
|   |   |   +-- meal.planner.component.html
|   |   |   +-- meal.planner.component.ts
|   |   |   +-- meal.planner.service.ts
|   |   |   +-- meal.planner.ts
|   |   +-- recipe
|   |   |   +-- recipe.component.css
|   |   |   +-- recipe.component.html
|   |   |   +-- recipe.component.ts
|   |   +-- recipe-list
|   |   |   +-- recipe.ts
|   |   |   +-- recipe-list.component.css
|   |   |   +-- recipe-list.component.html
|   |   |   +-- recipe-list.component.ts
|   |   |   +-- recipe-list.service.ts
|   |   +-- app-routing.module.ts
|   |   +-- app.component.css
|   |   +-- app.component.html
|   |   +-- app.component.ts
|   |   +-- app.module.ts


RecipeBookServer
+-- src
|   +-- auth.ts
|   +-- modelMealPlanner.ts
|   +-- modelRecipe.ts
|   +-- routesMealPlanner.ts
|   +-- routesRecipe.ts
|   +-- server.ts
