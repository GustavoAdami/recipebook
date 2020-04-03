"use strict";
/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           modelMealPlanner.ts
 *  Summary:        Database model of Meal Planner
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let MealPlanner = class MealPlanner {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], MealPlanner.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MealPlanner.prototype, "mondayRecipes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MealPlanner.prototype, "tuesdayRecipes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MealPlanner.prototype, "wednesdayRecipes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MealPlanner.prototype, "thursdayRecipes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MealPlanner.prototype, "fridayRecipes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MealPlanner.prototype, "saturdayRecipes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MealPlanner.prototype, "sundayRecipes", void 0);
MealPlanner = __decorate([
    typeorm_1.Entity()
], MealPlanner);
exports.MealPlanner = MealPlanner;
let connection;
function getMealPlannerRepository() {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection === undefined) {
            connection = yield typeorm_1.createConnection({
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
    });
}
exports.getMealPlannerRepository = getMealPlannerRepository;
