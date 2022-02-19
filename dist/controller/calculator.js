"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var exp_entity_1 = require("./../Database/exp.entity");
var calculation_1 = require("./../algo/calculation");
var typeorm_1 = require("typeorm");
var CalculatorController = /** @class */ (function () {
    function CalculatorController() {
    }
    CalculatorController.getHome = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render("home", { pageTitle: "Home Page" });
            return [2 /*return*/];
        });
    }); };
    CalculatorController.getCalculatorPage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render("calculator", { pageTitle: "Calculator", is_expression: false, is_error: false });
            return [2 /*return*/];
        });
    }); };
    CalculatorController.getAllExpressions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var expr_repository, all_expressions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expr_repository = typeorm_1.getConnection("NoteServer").getRepository(exp_entity_1.Expressions);
                    return [4 /*yield*/, expr_repository.find({})];
                case 1:
                    all_expressions = _a.sent();
                    res.render("expressions", { expressions: all_expressions, id_found: true });
                    return [2 /*return*/];
            }
        });
    }); };
    //@validateRequestBody(validationSchema)
    CalculatorController.addExpression = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var expr_repository, expression_str, answer, expression;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expr_repository = typeorm_1.getConnection("NoteServer").getRepository(exp_entity_1.Expressions);
                    expression_str = req.body.expression;
                    answer = calculation_1.calculator(expression_str);
                    console.log(answer);
                    if (!(Number(answer) || answer === "0")) return [3 /*break*/, 2];
                    expression = new exp_entity_1.Expressions();
                    expression.Expression = expression_str;
                    expression.Answer = answer;
                    return [4 /*yield*/, expr_repository.save(expression)];
                case 1:
                    _a.sent();
                    res.render("calculator", { pageTitle: "Calculator", expression: expression, is_error: false, is_expression: true });
                    return [3 /*break*/, 3];
                case 2:
                    res.render("calculator", { pageTitle: "Calculator", expression: expression_str, error: answer.error, is_error: true, is_expression: false });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CalculatorController.fetchExpression = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var expr_repository, req_exp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expr_repository = typeorm_1.getConnection("NoteServer").getRepository(exp_entity_1.Expressions);
                    return [4 /*yield*/, expr_repository.findByIds([req.body.expressionID])];
                case 1:
                    req_exp = _a.sent();
                    if (req_exp.length > 0) {
                        res.render("expressions", { expressions: req_exp, id_found: true });
                    }
                    else {
                        res.render("expressions", { result: "id not found!", id_found: false });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    CalculatorController.deleteExpression = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var req_id, expr_repository, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req_id = req.query.expression.toString();
                    expr_repository = typeorm_1.getConnection("NoteServer").getRepository(exp_entity_1.Expressions);
                    return [4 /*yield*/, expr_repository.delete(req_id)];
                case 1:
                    result = _a.sent();
                    if (result.affected > 0) {
                        res.redirect("/compute");
                    }
                    else {
                        res.render("expressions", { result: "id not found!", id_found: false });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return CalculatorController;
}());
exports.CalculatorController = CalculatorController;
//# sourceMappingURL=calculator.js.map