"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var calculatorRoutes_1 = require("./routes/calculatorRoutes");
var errorRoute_1 = require("./routes/errorRoute");
var path_1 = __importDefault(require("path"));
var env_path = path_1.default.join(__dirname, "..", ".env");
require("dotenv").config({ path: env_path });
var app = express_1.default();
app.use(body_parser_1.json(), body_parser_1.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(calculatorRoutes_1.router);
app.use(errorRoute_1.errorRouter);
app.listen(port, function () {
    console.log("server is listenin on port: " + port);
});
//# sourceMappingURL=index.js.map