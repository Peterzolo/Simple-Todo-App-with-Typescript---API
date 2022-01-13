"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const todoRouter = express_1.default.Router();
todoRouter.route('/fetch-todos').get(todo_controller_1.getAllTodos);
todoRouter.route('/add-todo').post(todo_controller_1.createTodos);
todoRouter.route('/fetch-todo/:id').get(todo_controller_1.fetchSingleTodo);
exports.default = todoRouter;
