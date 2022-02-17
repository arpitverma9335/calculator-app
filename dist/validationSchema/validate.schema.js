"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
exports.validationSchema = joi_1.default.object({
    expression: joi_1.default.string().required(),
});
//# sourceMappingURL=validate.schema.js.map