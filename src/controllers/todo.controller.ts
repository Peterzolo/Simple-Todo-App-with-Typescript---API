import { Response, Request } from 'express';
import { ITodo } from '../interface/todoInterface';
import Todo from '../model/Todo';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		const todos: ITodo[] = await Todo.find({ status: 'active' });
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

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		);
		res.status(200).send(updatedTodo);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const deleteTodo: ITodo | null = await Todo.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
		if (!deleteTodo) {
			res.status(402).send({ Not_found: 'Could not find Todo' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${deleteTodo}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
