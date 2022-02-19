"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_config_1 = require("../Database/db.config");
var calculator_1 = require("./../controller/calculator");
db_config_1.serverConnection(); //starting connection
exports.router = express_1.default.Router();
exports.router.get("/", calculator_1.CalculatorController.getHome);
exports.router.get("/calculator", calculator_1.CalculatorController.getCalculatorPage);
exports.router.post("/compute", calculator_1.CalculatorController.addExpression);
exports.router.get("/compute", calculator_1.CalculatorController.getAllExpressions);
exports.router.post("/compute/expression", calculator_1.CalculatorController.fetchExpression);
exports.router.get("/compute/expression/delete", calculator_1.CalculatorController.deleteExpression);
//# sourceMappingURL=calculatorRoutes.js.map