"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
const body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
//expressApp
const app = (0, express_1.default)();
// Use body-parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//connectToDatabase
const dbURI = process.env.db_URI || '';
const PORT = process.env.PORT;
mongoose_1.default.connect(dbURI)
    .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log(`listening on port ${PORT}`);
})
    .catch((err) => console.log(err));
//router
app.use('/', router_1.default);
