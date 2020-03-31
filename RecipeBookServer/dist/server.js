"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require('express-bearer-token');
const routesRecipe_1 = require("./routesRecipe");
const routesMealPlanner_1 = require("./routesMealPlanner");
const auth_1 = require("./auth");
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(bearerToken())
    .use(auth_1.oktaAuth)
    .use(routesRecipe_1.router)
    .use(routesMealPlanner_1.router);
app.listen(4201, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log('Recipe Book Server listening on port 4201');
});
