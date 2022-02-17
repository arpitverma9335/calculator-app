"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
exports.errorRouter = express_1.default.Router();
exports.errorRouter.use(function (req, res, next) {
    res.status(404).render("err404");
});
//# sourceMappingURL=errorRoute.js.map