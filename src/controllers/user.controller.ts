import { IUser } from '../interface/userInterface';
import User from '../model/User';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userRegister = async (req: Request, res: Response): Promise<void> => {
	const body = req.body;
	const user = await User.findOne({ email: body.email });
	if (user) {
		res.status(404).json({ Message: 'User already exists' });
	} else {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);
		const newUser = await new User({
			fullName: body.fullName,
			email: body.email,
			password: hashedPassword
		});
		const savedUser = await newUser.save();

		const payload = {
			id: savedUser._id,
			email: savedUser.email
		};

		const secret:string = 'jwt_secret';

		const expiresIn:{expiresIn:string} = { expiresIn: '1h' };

		const token:string = jwt.sign(payload, secret, expiresIn);

		res.status(201).json({
			Success: savedUser,
			accessToken: token
		});
	}
	try {
	} catch (error) {
		res.status(500).json(error);
	}
};
