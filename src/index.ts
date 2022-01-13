import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.route';

const app: Express = express();

const PORT: string | number = process.env.PORT || 6000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);
// app.use(todoRoutes)

const uri: string = 'mongodb://localhost:27017/Todo_Api-Typescript';
// const options = { useNewUrlParser: true, useUnifiedTopology: true, useF }
// mongoose.set("useFindAndModify", false)

mongoose
	.connect(uri)
	.then(() =>
		app.listen(PORT, () => {
			if (uri) {
				console.log('Connection to MongoDB has been successfully established');
				console.log(`Server is listening on port ${PORT}`);
			} else {
				console.log('Something went wrong');
			}
		})
	)
	.catch((error) => {
		throw error;
	});
