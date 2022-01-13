import { ITodo } from '../interface/todoInterface';
import { model, Schema } from 'mongoose';

const TodoSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},

		description: {
			type: String,
			required: true
		},

		status: {
			type: String,
			enum: [ 'active', 'inactive' ],
			default: 'active'
		},

		isComplete: {
			type: String,
			enum: [ 'completed', 'non-completed' ],
			default: 'non-completed',
			required: true
		}
	},
	{ timestamps: true }
);

export default model<ITodo>('Todo', TodoSchema);
