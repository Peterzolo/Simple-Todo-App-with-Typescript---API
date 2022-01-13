"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
userRouter.route('/register').post(user_controller_1.userRegister);
userRouter.route('/login').post(user_controller_1.userLogin);
exports.default = userRouter;
