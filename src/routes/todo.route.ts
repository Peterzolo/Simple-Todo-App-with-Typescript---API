import express, { Express } from 'express';
import { createTodos, fetchSingleTodo, getAllTodos } from '../controllers/todo.controller';

const todoRouter = express.Router();

todoRouter.route('/fetch-todos').get(getAllTodos);
todoRouter.route('/add-todo').post(createTodos);
todoRouter.route('/fetch-todo/:id').get(fetchSingleTodo);

export default todoRouter;
