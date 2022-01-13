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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSingleTodo = exports.createTodos = exports.getAllTodos = void 0;
const Todo_1 = __importDefault(require("../model/Todo"));
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find();
        if (!todos.length) {
            res.status(404).json({ Not_found: 'Not Todo was found' });
        }
        else {
            res.status(200).json({ todos });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getAllTodos = getAllTodos;
const createTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newTodo = yield new Todo_1.default({
            title: body.title,
            description: body.description
        });
        const savedTodo = yield newTodo.save();
        res.status(201).json({ Success: { savedTodo } });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createTodos = createTodos;
const fetchSingleTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            res.status(401).send({ Not_found: 'No brand was found' });
        }
        else {
            res.status(201).send({ Success: todo });
        }
    }
    catch (error) {
        res.status(500).send({ error, message: 'Error finding brands' });
    }
});
exports.fetchSingleTodo = fetchSingleTodo;
