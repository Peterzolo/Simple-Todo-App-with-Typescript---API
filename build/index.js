"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 6000;
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/todos', todo_route_1.default);
app.use('/api/users', user_route_1.default);
const uri = 'mongodb://localhost:27017/Todo_Api-Typescript';
// const options = { useNewUrlParser: true, useUnifiedTopology: true, useF }
// mongoose.set("useFindAndModify", false)
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => {
    if (uri) {
        console.log('Connection to MongoDB has been successfully established');
        console.log(`Server is listening on port ${PORT}`);
    }
    else {
        console.log('Something went wrong');
    }
}))
    .catch((error) => {
    throw error;
});
