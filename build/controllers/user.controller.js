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
exports.userRegister = void 0;
const User_1 = __importDefault(require("../model/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield User_1.default.findOne({ email: body.email });
    if (user) {
        res.status(404).json({ Message: 'User already exists' });
    }
    else {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(body.password, salt);
        const newUser = yield new User_1.default({
            fullName: body.fullName,
            email: body.email,
            password: hashedPassword
        });
        const savedUser = yield newUser.save();
        const payload = {
            id: savedUser._id,
            email: savedUser.email
        };
        const secret = 'jwt_secret';
        const expiresIn = { expiresIn: '1h' };
        const token = jsonwebtoken_1.default.sign(payload, secret, expiresIn);
        res.status(201).json({
            Success: savedUser,
            accessToken: token
        });
    }
    try {
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.userRegister = userRegister;
