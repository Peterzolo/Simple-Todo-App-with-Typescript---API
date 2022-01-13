import express from 'express';
const userRouter = express.Router();

import { userLogin, userRegister } from '../controllers/user.controller';

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);

export default userRouter;
