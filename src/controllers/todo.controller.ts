import { Response, Request } from 'express';
import { ITodo } from '../interface/todoInterface';
import Todo from '../model/Todo';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		const todos: ITodo[] = await Todo.find();
		if (!todos.length) {
			res.status(404).json({ Not_found: 'Not Todo was found' });
		} else {
			res.status(200).json({ todos });
		}
	} catch (error) {
		throw error;
	}
};

export const createTodos = async (req: Request, res: Response): Promise<void> => {
	const body = req.body;
	try {
		const newTodo = await new Todo({
			title: body.title,
			description: body.description
		});
		const savedTodo = await newTodo.save();
		res.status(201).json({ Success: { savedTodo } });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const fetchSingleTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			res.status(401).send({ Not_found: 'No brand was found' });
		} else {
			res.status(201).send({ Success: todo });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding brands' });
	}
};
