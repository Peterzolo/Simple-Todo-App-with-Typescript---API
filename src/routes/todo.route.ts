import express, { Express } from 'express';
import { createTodos, deleteTodo, fetchSingleTodo, getAllTodos, updateTodo } from '../controllers/todo.controller';

const todoRouter = express.Router();

todoRouter.route('/fetch-todos').get(getAllTodos);
todoRouter.route('/add-todo').post(createTodos);
todoRouter.route('/fetch-todo/:id').get(fetchSingleTodo);
todoRouter.route('/edit-todo/:id').put(updateTodo);
todoRouter.route('/remove-todo/:id').delete(deleteTodo);

export default todoRouter;
