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

		const secret: string = 'jwt_secret';

		const expiresIn: { expiresIn: string } = { expiresIn: '1h' };

		const token: string = jwt.sign(payload, secret, expiresIn);

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

export const userLogin = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		if (!email && !password) res.status(404).json({ message: 'All fields must be completed' });

		const checkUserExists = await User.findOne({ email });
		if (!checkUserExists) {
			res.status(402).json({ message: 'Invalid parameters' });
		} else {
			const isValidPassword = bcrypt.compare(password, checkUserExists.password);
			if (!isValidPassword) {
				res.status(402).json({ message: "Invalid Credentials, 'Try again" });
			} else {
				const payload: { id: string; email: string } = {
					email: checkUserExists.email,
					id: checkUserExists._id
				};

				const secret: string = 'jwt_secret';
				const expiresIn: { expiresIn: string } = { expiresIn: '1h' };

				const token = jwt.sign(payload, secret, expiresIn);

                res.status(200).json({success: token})
			}
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
